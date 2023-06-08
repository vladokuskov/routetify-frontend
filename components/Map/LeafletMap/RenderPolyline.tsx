import { useEffect, useState } from 'react'

import { mapConfig } from '@/config/map'
import { useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import * as L from 'leaflet'

const RenderPolyline = ({ map }: { map: L.Map | null }) => {
  const [drawPolyline, setDrawPolyline] = useState<L.Polyline | null>(null)

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const isMarkerDragging = useAppSelector(
    (state) => state.controlsReducer.isMarkerDragging,
  )
  const lineColor = useAppSelector(
    (state) => state.controlsReducer.colorPicker.color,
  )

  const previewPolyline = L.polyline([], {
    color: mapConfig.lineColor.preview,
    weight: 6,
    dashArray: '15, 15',
    className: 'cursorCrosshair',
  })

  const onMouseMove = (event: L.LeafletMouseEvent) => {
    const latestCoords = [...drawCoords, event.latlng].slice(-2)
    previewPolyline.setLatLngs(latestCoords)
  }

  const onMouseClick = () => {
    map?.off('mousemove', onMouseMove)
    map?.off('click', onMouseClick)
  }

  useEffect(() => {
    if (!map) return

    const polyline = L.polyline(drawCoords as any, {
      color: lineColor,
      weight: 6,
      className: 'cursorCrosshair',
    })

    setDrawPolyline(polyline)
    polyline.addTo(map)

    return () => {
      polyline.remove()
      previewPolyline.remove()
      map.off('mousemove', onMouseMove)
      map.off('click', onMouseClick)
    }
  }, [map, drawCoords, lineColor])

  useEffect(() => {
    if (
      !drawPolyline ||
      (drawType !== DrawType.Line && map && drawPolyline.addTo(map))
    )
      return

    if (map && drawPolyline && drawType === DrawType.Line) {
      if (!isMarkerDragging) {
        map.on('mousemove', onMouseMove)
        map.on('click', onMouseClick)
        previewPolyline.addTo(map)
      }

      return () => {
        if (!isMarkerDragging) {
          previewPolyline.remove()
          map.off('mousemove', onMouseMove)
          map.off('click', onMouseClick)
        }
      }
    }
  }, [drawPolyline, drawType, map, isMarkerDragging])

  return null
}

export default RenderPolyline
