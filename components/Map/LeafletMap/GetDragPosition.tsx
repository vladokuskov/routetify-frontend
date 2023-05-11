import {
  changeCurrentCoords,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import { useMapEvents } from 'react-leaflet'

const GetPositionByDragging = () => {
  const dispatch = useAppDispatch()

  const locationStatus = useAppSelector(
    (state) => state.controlsReducer.location,
  )

  useMapEvents({
    drag: (e: L.LeafletEvent) => {
      dispatch(
        changeCurrentCoords({
          currentCoords: {
            lat: e.target.getCenter().lat,
            lng: e.target.getCenter().lng,
            zoom: e.target.getZoom(),
          },
        }),
      )
    },
    dragstart: () => {
      dispatch(
        changeLocationStatus(
          locationStatus === LocationStatus.fetching
            ? LocationStatus.fetching
            : LocationStatus.idle,
        ),
      )
    },
  })
  return null
}

export default GetPositionByDragging
