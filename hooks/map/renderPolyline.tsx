import { useState, useEffect } from 'react'
import * as L from 'leaflet'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import { mapConfig } from '@/config/map'
import { updateExportCoords } from '../../redux/features/drawSlice'

const useRenderPolyline = (e: L.Map | null) => {
  const [drawPolyline, setDrawPolyline] = useState<L.Polyline | null>(null)

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const isMarkerDragging = useAppSelector(
    (state) => state.controlsReducer.isMarkerDragging,
  )
  const lineColor = useAppSelector(
    (state) => state.controlsReducer.colorPicker.color,
  )

  const dispatch = useAppDispatch()

  const previewPolyline = L.polyline([], {
    color: mapConfig.lineColor.preview,
    weight: 6,
    dashArray: '15, 15',
  })

  const onMouseMove = (event: L.LeafletMouseEvent) => {
    const latestCoords = [...drawCoords, event.latlng].slice(-2)
    previewPolyline.setLatLngs(latestCoords)
  }

  const onMouseClick = () => {
    e?.off('mousemove', onMouseMove)
    e?.off('click', onMouseClick)
  }

  useEffect((): ReturnType<L.Polyline | any> => {
    if (!e) return

    if (e) {
      const polyline = L.polyline(drawCoords as any, {
        color: lineColor,
        weight: 6,
      })

      setDrawPolyline(polyline)

      return () => {
        polyline.remove()
        previewPolyline.remove()
        e.off('mousemove', onMouseMove)
        e.off('click', onMouseClick)
      }
    }
  }, [e, drawCoords, lineColor])

  useEffect(() => {
    if (
      !drawPolyline ||
      (drawType !== DrawType.Line && e && drawPolyline.addTo(e))
    )
      return

    if (e && drawPolyline && drawType === DrawType.Line) {
      if (!isMarkerDragging) {
        e.on('mousemove', onMouseMove)
        e.on('click', onMouseClick)
        previewPolyline.addTo(e)
      }

      drawPolyline.addTo(e)
      dispatch(updateExportCoords(drawCoords))
      return () => {
        if (!isMarkerDragging) {
          previewPolyline.remove()
          drawPolyline.remove()
          e.off('mousemove', onMouseMove)
          e.off('click', onMouseClick)
        }
      }
    }
  }, [drawPolyline, drawType, e, isMarkerDragging])
}

export default useRenderPolyline
