import { Button } from '@/components/Button/Button'
import LocationIcon from '../../../../assets/icons/location.svg'
import LocationFilledIcon from '../../../../assets/icons/location-filled.svg'
import LoadingIcon from '../../../../assets/icons/loader.svg'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  changeCurrentCoords,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { LocationStatus } from '@/types/global/locationStatus.types'
import { addLatLng } from '@/redux/features/geocoderSlice'
import Icon from '@/components/Icon/Icon'

const MapControlFindLocation = () => {
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
              zoom: 16,
            }

            if (geoPoint) {
              dispatch(addLatLng(geoPoint))

              dispatch(changeCurrentCoords({ currentCoords: geoPoint }))

              dispatch(changeLocationStatus(LocationStatus.success))
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
      title={'Find location'}
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
