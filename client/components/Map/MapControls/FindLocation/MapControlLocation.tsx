import { Button } from '@/components/ui/button'
import LoadingIcon from '@/assets/icons/loader.svg'
import LocationFilledIcon from '@/assets/icons/location-filled.svg'
import LocationIconOff from '@/assets/icons/location-off.svg'
import LocationIconBroken from '@/assets/icons/location-broken.svg'

import Icon from '@/components/Icon/Icon'
import {
  changeCurrentCoords,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import updateMapView from '@/lib/updateMapView'
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
    <Button
      variant="map"
      size="cube"
      title="Find location [ALT + J]"
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
  )
}

export { MapControlFindLocation }
