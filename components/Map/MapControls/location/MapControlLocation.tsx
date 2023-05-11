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

const MapControlLocation = () => {
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
      variant="icon"
      text="Location"
      loading={locationStatus === LocationStatus.fetching ? 'true' : 'false'}
      icon={
        locationStatus === LocationStatus.success
          ? LocationFilledIcon
          : locationStatus === LocationStatus.fetching
          ? LoadingIcon
          : LocationIcon
      }
      onClick={getLocation}
      status={
        locationStatus === LocationStatus.error
          ? 'danger'
          : locationStatus === LocationStatus.success
          ? 'success'
          : 'default'
      }
    />
  )
}

export { MapControlLocation }
