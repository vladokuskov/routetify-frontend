import { Button } from '@/components/Button/Button'
import LoadingIcon from '../../../../assets/icons/loader.svg'
import LocationFilledIcon from '../../../../assets/icons/location-filled.svg'
import LocationIcon from '../../../../assets/icons/location.svg'

import Icon from '@/components/Icon/Icon'
import {
  changeCurrentCoords,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import updateMapView from '@/lib/updateMapView'

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

  return (
    <Button
      variant="map"
      aria-label={'Find location'}
      onClick={getLocation}
      status={
        locationStatus === LocationStatus.error
          ? 'danger'
          : locationStatus === LocationStatus.success
          ? 'success'
          : 'default'
      }
    >
      <Icon
        svg={
          locationStatus === LocationStatus.success
            ? LocationFilledIcon
            : locationStatus === LocationStatus.fetching
            ? LoadingIcon
            : LocationIcon
        }
        spin={locationStatus === LocationStatus.fetching ? 'true' : 'false'}
      />
    </Button>
  )
}

export { MapControlFindLocation }
