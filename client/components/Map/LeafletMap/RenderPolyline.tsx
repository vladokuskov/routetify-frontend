import { useEffect, useState } from 'react'

import { useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import * as L from 'leaflet'
import 'leaflet-polylinedecorator'

const RenderPolyline = ({ map }: { map: L.Map | null }) => {
  const [drawPolyline, setDrawPolyline] = useState<L.Polyline | null>(null)

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const isMarkerDragging = useAppSelector(
    (state) => state.controlsReducer.isMarkerDragging,
  )

  const polyline = L.polyline(drawCoords, {
    color: '#83f520',
    weight: 6,
    className: 'cursorCrosshair',
    lineCap: 'round',
    lineJoin: 'round',
  })

  const previewPolyline = L.polyline([], {
    color: '#3520f570',
    weight: 6,
    dashArray: '15, 15',
    className: 'cursorCrosshair',
  })

  const decorator = L.polylineDecorator(polyline, {
    patterns: [
      {
        offset: 40,
        repeat: '60px',
        symbol: L.Symbol.arrowHead({
          pixelSize: 12,
          pathOptions: {
            color: '#bde29c',
            fillOpacity: 0.5,
            opacity: 0.3,
            className: 'cursorCrosshair',
          },
        }),
      },
    ],
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

    setDrawPolyline(polyline)
    polyline.addTo(map)
    decorator.addTo(map)

    return () => {
      polyline.remove()
      decorator.remove()
      previewPolyline.remove()

      map.off('mousemove', onMouseMove)
      map.off('click', onMouseClick)
    }
  }, [map, drawCoords])

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
