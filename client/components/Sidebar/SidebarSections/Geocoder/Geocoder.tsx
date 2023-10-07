import { useEffect, useRef, useState } from 'react'

import SearchIcon from '@/assets/icons/search.svg'
import Icon from '@/components/ui/icon'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getPlace } from '@/lib/api/geocoder'

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
  const [isResultsOpen, setIsResultsOpen] = useClickOutside(ref, false)
  const [hasUserTyped, setHasUserTyped] = useState(false)

  const map = useAppSelector((state) => state.controlsReducer.map)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.select()

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
    setGeocoderResponse(null)
  }

  const fetchGeoData = async () => {
    if (!map) {
      toast.error('Map is not initialized.')
      return
    }

    try {
      const data = await getPlace(geocoderValue)

      if (data.length > 0) {
        setGeocoderResponse(data)
        setIsResultsOpen(true)
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
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
      } else if (geocoderValue.length === 0) {
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
          variant="map"
          disabled={!map}
          placeholder="Search location"
          onFocus={handleFocus}
          value={geocoderValue}
          onChange={handleChangeGeocoder}
        />
        {geocoderResponse && isResultsOpen && (
          <div
            className="w-full bg-dropdown border-2 border-dropdown-foreground top-[2.8rem] flex flex-col items-center justify-start gap-1 absolute rounded-md z-20 shadow p-1"
            role="listbox"
            aria-expanded={isResultsOpen}
            id="geocoder-results"
          >
            {geocoderResponse.slice(0, 3).map((data: TGeoResponse, i) => {
              let { lat, lon, display_name } = data
              return (
                <Button
                  variant="ghost"
                  className="w-full h-auto text-base"
                  key={i}
                  aria-label={display_name}
                  onClick={() => handleResultSelect({ lat, lon, display_name })}
                  id={`geocoder-option-${i}`}
                >
                  {display_name}
                </Button>
              )
            })}
          </div>
        )}
      </div>

      <Button
        variant="secondary"
        className={clsx(
          'w-full',
          'max-sm:hidden',
          !isSidebarOpen ? 'inline-flex' : 'hidden',
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
            dispatch(toggleIsSidebarOpen(true))
          }
        }}
      >
        <Icon svg={SearchIcon} />
      </Button>
    </>
  )
}

export { Geocoder }
