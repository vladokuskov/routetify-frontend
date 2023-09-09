import { useEffect, useRef, useState } from 'react'

import SpinnerIcon from '@/assets/icons/loader.svg'
import SearchIcon from '@/assets/icons/search.svg'
import Icon from '@/components/Icon/Icon'
import { Input } from '@/components/Input/Input'
import { useClickOutside } from '@/hooks/useClickOutside'
import updateMapView from '@/lib/updateMapView'
import {
  changeLocationStatus,
  toggleIsSidebarOpen,
} from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import clsx from 'clsx'
import { toast } from 'react-hot-toast'

interface TGeoResponse {
  lat: number
  lon: number
  display_name?: string
}

interface GeoCoords {
  lat: number
  lon: number
}

const Geocoder = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [geocoderValue, setGeocoderValue] = useState<string>('')
  const [geocoderResponse, setGeocoderResponse] = useState<
    TGeoResponse[] | null
  >(null)
  const [lastSelectedResult, setLastSelectedResult] =
    useState<GeoCoords | null>(null)
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

    setLastSelectedResult({ lat, lon })

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
    // Input debounce
    let timer: ReturnType<typeof setTimeout>

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
          icon={
            isGeocoderLoading ? (
              <Icon svg={SpinnerIcon} spin />
            ) : (
              <Icon svg={SearchIcon} />
            )
          }
          className={isResultsOpen ? 'rounded-b-none' : ''}
          aria-haspopup="listbox"
          aria-expanded={isResultsOpen}
          aria-owns="geocoder-results"
        />
        {geocoderResponse && isResultsOpen && (
          <div
            className="w-full top-[2.5rem] absolute rounded-t-none rounded-md z-20 bg-neutral-300 shadow p-1"
            role="listbox"
            aria-expanded={isResultsOpen}
            id="geocoder-results"
          >
            {geocoderResponse.slice(0, 3).map((data: TGeoResponse, i) => {
              let { lat, lon, display_name } = data
              return (
                <button
                  key={i}
                  className={clsx(
                    'w-full p-2 text-neutral-600 hocus:bg-neutral-200 hocus:text-neutral-950 rounded-md transition-colors font-semibold',
                  )}
                  aria-label={display_name}
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
        aria-label={
          lastSelectedResult ? 'Last selected location' : 'Location search'
        }
        title={
          lastSelectedResult ? 'Last selected location' : 'Location search'
        }
        onClick={() => {
          if (lastSelectedResult) {
            handleResultSelect({
              lat: lastSelectedResult.lat,
              lon: lastSelectedResult.lon,
            })
          } else {
            dispatch(toggleIsSidebarOpen())
          }
        }}
      >
        <Icon svg={SearchIcon} />
      </button>
    </>
  )
}

export { Geocoder }
