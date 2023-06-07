import { useEffect } from 'react'

import * as L from 'leaflet'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { changeFitBounds } from '../../redux/features/controlsSlice'

const useFitBoundsOnClick = (map: L.Map | null) => {
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const isFitBounds = useAppSelector(
    (state) => state.controlsReducer.isFitBounds,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (map && isFitBounds && drawCoords.length !== 0) {
      map.fitBounds(drawCoords as any)
      dispatch(changeFitBounds(false))
    }
  }, [isFitBounds, drawCoords])
}

export default useFitBoundsOnClick
