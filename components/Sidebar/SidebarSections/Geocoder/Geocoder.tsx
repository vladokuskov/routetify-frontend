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
import SearchIcon from '../../../../assets/icons/search.svg'
import { useClickOutside } from '../../../../hooks/useClickOutside'
import { Input } from '../../../Input/Input'
import { TGeoResponse } from './Geocoder.types'

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

  const handleClear = () => {
    setGeocoderValue('')
    setGeocoderResponse(null)
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
    try {
      let url = `https://geocode.maps.co/search?q=${geocoderValue}`

      setIsGeocoderLoading(true)
      const response = await fetch(url)
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()

      setGeocoderResponse(data)
      setIsGeocoderLoading(false)
      setIsResultsOpen(true)
    } catch (error) {
      console.error('An error occurred:', error)
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
        setGeocoderResponse([])
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
          value={geocoderValue}
          onChange={handleChangeGeocoder}
          loading={isGeocoderLoading ? 'true' : 'false'}
          onClick={handleClear}
          full="true"
        />
        {geocoderResponse && isResultsOpen && (
          <div className="w-full top-10 absolute rounded-md  z-20">
            {geocoderResponse.slice(0, 3).map((data: TGeoResponse, i) => {
              let { lat, lon, display_name } = data
              return (
                <button
                  key={i}
                  className="w-full  flex flex-col items-center  justify-center border p-2 font-semibold text-neutral-600 bg-neutral-300 border-b-neutral-400 last:border-none last:rounded-b-md first:rounded-t-md hocus:bg-neutral-200 transition-colors"
                  title={display_name}
                  onClick={() => handleResultSelect({ lat, lon, display_name })}
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
          'bg-neutral-300 w-full-h-full p-2 rounded-md text-neutral-500 hocus:bg-neutral-200 hocus:text-neutral-400 transition-colors',
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
