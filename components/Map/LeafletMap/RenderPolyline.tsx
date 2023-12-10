import { useEffect, useState } from 'react'

import { useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import * as L from 'leaflet'

const RenderPolyline = ({ map }: { map: L.Map | null }) => {
  const [drawPolyline, setDrawPolyline] = useState<L.Polyline | null>(null)
  const [borderPolyline, setBorderPolyline] = useState<L.Polyline | null>(null)

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const activeWaypointIndex = useAppSelector(
    (state) => state.drawReducer.activeWaypointIndex,
  ) // null or number
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const isMarkerDragging = useAppSelector(
    (state) => state.controlsReducer.isMarkerDragging,
  )

  const mainPolyline = L.polyline(drawCoords, {
    color: '#3471f5',
    opacity: 1,
    weight: 4,
    className: 'cursorCrosshair',
    lineCap: 'round',
    lineJoin: 'round',
  })

  const border = L.polyline(drawCoords, {
    color: '#1e51be',
    opacity: 1,
    weight: 7,
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

  const onMouseMove = (event: L.LeafletMouseEvent) => {
    let latestCoords = []
    if (activeWaypointIndex !== null && drawCoords.length) {
      latestCoords = [drawCoords[activeWaypointIndex], event.latlng]
    } else {
      latestCoords = [...drawCoords, event.latlng].slice(-2)
    }
    previewPolyline.setLatLngs(latestCoords)
  }

  const onMouseClick = () => {
    map?.off('mousemove', onMouseMove)
    map?.off('click', onMouseClick)
  }

  useEffect(() => {
    if (!map) return

    setDrawPolyline(mainPolyline)
    setBorderPolyline(borderPolyline)

    mainPolyline.addTo(map).bringToFront()
    border.addTo(map).bringToBack()

    return () => {
      mainPolyline.remove()
      border.remove()
      previewPolyline.remove()

      map.off('mousemove', onMouseMove)
      map.off('click', onMouseClick)
    }
  }, [map, drawCoords, activeWaypointIndex])

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
