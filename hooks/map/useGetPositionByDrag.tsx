import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  changeCurrentCoords,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { LocationStatus } from '@/types/global/locationStatus.types'

const useGetPositionByDrag = (map: L.Map | null) => {
  const dispatch = useAppDispatch()

  const locationStatus = useAppSelector(
    (state) => state.controlsReducer.location,
  )

  useEffect(() => {
    if (!map) return

    const dragStartHandler = () => {
      dispatch(
        changeLocationStatus(
          locationStatus === LocationStatus.fetching
            ? LocationStatus.fetching
            : LocationStatus.idle,
        ),
      )
    }

    map.on('dragstart', dragStartHandler)

    return () => {
      map.off('dragstart', dragStartHandler)
    }
  }, [map, dispatch, locationStatus])

  return null
}

export default useGetPositionByDrag
