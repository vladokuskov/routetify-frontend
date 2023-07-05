import { useEffect, useRef, useState } from 'react'

import Icon from '@/components/Icon/Icon'
import updateMapView from '@/lib/updateMapView'
import {
  changeLocationStatus,
  toggleIsSidebarOpen,
} from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import clsx from 'clsx'
import SpinnerIcon from '../../../../assets/icons/loader.svg'
import SearchIcon from '../../../../assets/icons/search.svg'
import { useClickOutside } from '../../../../hooks/useClickOutside'
import { Input } from '../../../Input/Input'
import { TGeoResponse } from './Geocoder.types'
import { toast } from 'react-hot-toast'

const Geocoder = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [geocoderValue, setGeocoderValue] = useState<string>('')
  const [geocoderResponse, setGeocoderResponse] = useState<
    TGeoResponse[] | null
  >(null)
  const [isGeocoderLoading, setIsGeocoderLoading] = useState<boolean>(false)
  const [isResultsOpen, setIsResultsOpen] = useClickOutside(ref, false)
  const [hasUserTyped, setHasUserTyped] = useState(false)

  const map = useAppSelector((state) => state.controlsReducer.map)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

  const handleChangeGeocoder = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setGeocoderValue(e.target.value)
    setHasUserTyped(true)
  }

  const handleResultSelect = ({ lat, lon, display_name }: TGeoResponse) => {
    dispatch(
      addLatLng({
        lat: lat,
        lng: lon,
        zoom: 12,
      }),
    )

    updateMapView(map, {
      lat: lat,
      lng: lon,
      zoom: 12,
    })

    dispatch(changeLocationStatus(LocationStatus.idle))

    if (display_name) {
      setGeocoderValue(display_name)
    }

    window.scrollTo(0, 0)
    setIsResultsOpen(false)
    setHasUserTyped(false)
  }

  const fetchGeoData = async () => {
    if (!map) {
      toast.error('Map is not initialized.')
      return
    }

    try {
      let url = `https://geocode.maps.co/search?q=${geocoderValue}`

      setIsGeocoderLoading(true)
      const response = await fetch(url)
      if (!response.ok) {
        toast.error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()

      if (data.length > 0) {
        setGeocoderResponse(data)
        setIsResultsOpen(true)
      }

      setIsGeocoderLoading(false)
    } catch (error) {
      toast.error(`An error occurred`)
    }
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    // Fetch geocoder after 400ms when user stop typing
    if (hasUserTyped) {
      if (geocoderValue.length >= 3) {
        timer = setTimeout(() => {
          fetchGeoData()
        }, 400)
      } else if (geocoderValue.length < 3) {
        setGeocoderResponse(null)
        setIsResultsOpen(false)
      }
    }

    return () => clearTimeout(timer)
  }, [geocoderValue, hasUserTyped])

  return (
    <>
      <div
        className={clsx(
          'w-full relative font-roboto',
          'max-sm:block',
          isSidebarOpen ? 'block' : 'hidden',
        )}
        ref={ref}
      >
        <Input
          placeholder="Search location"
          variant="search"
          onClick={() => geocoderResponse && setIsResultsOpen(true)}
          value={geocoderValue}
          onChange={handleChangeGeocoder}
          icon={isGeocoderLoading ? SpinnerIcon : SearchIcon}
          loading={isGeocoderLoading ? 'true' : 'false'}
          className={isResultsOpen ? 'rounded-b-none' : ''}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isResultsOpen}
          aria-owns="geocoder-results"
        />
        {geocoderResponse && isResultsOpen && (
          <div
            className="w-full top-[2.5rem] absolute rounded-t-none rounded-md z-20 bg-neutral-300 shadow p-1"
            role="listbox"
            id="geocoder-results"
          >
            {geocoderResponse.slice(0, 3).map((data: TGeoResponse, i) => {
              let { lat, lon, display_name } = data
              return (
                <button
                  key={i}
                  className={clsx(
                    'w-full p-2 text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 rounded-md transition-colors font-semibold',
                  )}
                  title={display_name}
                  onClick={() => handleResultSelect({ lat, lon, display_name })}
                  id={`geocoder-option-${i}`}
                >
                  {display_name}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <button
        className={clsx(
          'bg-neutral-300 w-full-h-full p-3 rounded-md text-neutral-500 hocus:bg-neutral-200 hocus:text-neutral-400 transition-colors',
          'max-sm:hidden',
          !isSidebarOpen ? 'block' : 'hidden',
        )}
        title="Location search"
        onClick={() => {
          dispatch(toggleIsSidebarOpen())
        }}
      >
        <Icon svg={SearchIcon} />
      </button>
    </>
  )
}

export { Geocoder }
