import LoadingIcon from '@/assets/icons/loader.svg'
import LocationIconBroken from '@/assets/icons/location-broken.svg'
import LocationFilledIcon from '@/assets/icons/location-filled.svg'
import LocationIconOff from '@/assets/icons/location-off.svg'
import { Button } from '@/components/ui/button'

import Icon from '@/components/ui/icon'
import { KeybindTooltip } from '@/components/ui/keybind-tooltip'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import updateMapView from '@/lib/updateMapView'
import {
  changeCurrentCoords,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import { useHotkeys } from 'react-hotkeys-hook'

const MapControlFindLocation = () => {
  const map = useAppSelector((state) => state.controlsReducer.map)
  const dispatch = useAppDispatch()

  const locationStatus = useAppSelector(
    (state) => state.controlsReducer.location,
  )

  const getLocation = async () => {
    try {
      if (navigator.geolocation) {
        dispatch(changeLocationStatus(LocationStatus.fetching))
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const geoPoint = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              zoom: 14,
            }

            if (geoPoint) {
              dispatch(addLatLng(geoPoint))

              dispatch(changeLocationStatus(LocationStatus.success))

              updateMapView(map, geoPoint)

              dispatch(
                changeCurrentCoords({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  zoom: 14,
                }),
              )
            }
          },
          (error) => {
            dispatch(changeLocationStatus(LocationStatus.error))
          },
        )
      }
    } catch (error) {
      dispatch(changeLocationStatus(LocationStatus.error))
    }
  }

  useHotkeys('alt+j', getLocation)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="map"
            size="cube"
            aria-label="Find location"
            onClick={getLocation}
            status={
              locationStatus === LocationStatus.error
                ? 'danger'
                : locationStatus === LocationStatus.success
                ? 'service'
                : undefined
            }
          >
            <Icon
              svg={
                locationStatus === LocationStatus.success
                  ? LocationFilledIcon
                  : locationStatus === LocationStatus.fetching
                  ? LoadingIcon
                  : locationStatus === LocationStatus.error
                  ? LocationIconBroken
                  : LocationIconOff
              }
              spin={locationStatus === LocationStatus.fetching}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={5} side="left" avoidCollisions>
          <p>
            Find location <KeybindTooltip>ALT+J</KeybindTooltip>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { MapControlFindLocation }
