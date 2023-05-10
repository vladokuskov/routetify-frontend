import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useState, useEffect } from 'react'

import * as L from 'leaflet'

import { updateExportCoords } from '../../redux/features/drawSlice'
import { DrawType } from '@/types/global/index.types'

const useRenderPolyline = (e: L.Map | null) => {
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const lineColor = useAppSelector(
    (state) => state.controlsReducer.colorPicker.color,
  )

  const dispatch = useAppDispatch()
  const [drawPolyline, setDrawPolyline] = useState<L.Polyline | null>(null)

  useEffect((): ReturnType<L.Polyline | any> => {
    if (!e) return

    if (e) {
      const polyline = L.polyline(drawCoords as any, {
        color: lineColor,
        weight: 6,
      })

      if (polyline) {
        setDrawPolyline(polyline)
        return () => polyline.remove()
      }
    }
  }, [e, drawCoords, lineColor])

  useEffect(() => {
    if (!drawPolyline) return

    if (e) {
      if (drawPolyline && drawType === DrawType.Hand) {
        drawPolyline.addTo(e)
        dispatch(updateExportCoords(drawCoords))
      } else if (drawPolyline && drawType === DrawType.Road) {
        drawPolyline.remove()
      }
    }
  }, [drawPolyline, drawType, e, location])
}

export default useRenderPolyline
