import {
  changeCurrentCoords,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { useAppDispatch } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/index.types'
import { useMapEvents } from 'react-leaflet'

function GetPositionByDragging() {
  const dispatch = useAppDispatch()
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
      dispatch(changeLocationStatus(LocationStatus.idle))
    },
  })
  return null
}

export default GetPositionByDragging
