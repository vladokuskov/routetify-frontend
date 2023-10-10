import { toggleIsMarkerDragging } from '@/redux/features/controlsSlice'
import {
  updateActiveWaypoint,
  updateDraggedMarkerCoords,
} from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import * as L from 'leaflet'
import { useEffect } from 'react'

const RenderMarkers = ({ map }: { map: L.Map | null }) => {
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const activeWaypointIndex = useAppSelector(
    (state) => state.drawReducer.activeWaypointIndex,
  )
  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const markersLayer = L.layerGroup()

    if (map && drawCoords.length) {
      drawCoords.forEach((coords, i) => {
        let lastIndex = drawCoords.length - 1

        let markerOptions: L.MarkerOptions = {
          alt: '',
          title: `Waypoint ${i}`,
          draggable: drawType === DrawType.Line,
        }

        if (i === 0) {
          markerOptions.icon = L.icon({
            iconUrl: 'map/start-marker.svg',
            iconSize: [33, 33],
            iconAnchor: [6, 25],
            className: `${drawType === DrawType.None && 'cursorCrosshair'}`,
          })
        } else if (i > 0 && i < lastIndex) {
          const borderColorClass =
            activeWaypointIndex === i ? 'border-red-500' : 'border-neutral-300'
          markerOptions.icon = L.divIcon({
            html: `<div class="bg-neutral-50 border-2 ${borderColorClass} p-1 rounded-full"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
            className: `${drawType === DrawType.None && 'cursorCrosshair'}`,
          })
        } else if (i === lastIndex && drawCoords.length > 1) {
          markerOptions.icon = L.icon({
            iconUrl: 'map/finish-marker.svg',
            iconSize: [33, 33],
            iconAnchor: [13, 32],
            className: `${drawType === DrawType.None && 'cursorCrosshair'}`,
          })
        }

        const marker = L.marker(coords, markerOptions).addTo(markersLayer)

        if (drawType === DrawType.Line) {
          marker.on('dragstart', () => {
            dispatch(toggleIsMarkerDragging(true))
          })

          marker.on('dragend', () => {
            const markerLatLng = marker.getLatLng()
            const newCoords = { lat: markerLatLng.lat, lng: markerLatLng.lng }

            dispatch(updateDraggedMarkerCoords({ i, newCoords }))
            dispatch(toggleIsMarkerDragging(false))
          })

          marker.on('click', () => {
            dispatch(updateActiveWaypoint({ newIndex: i }))
            dispatch(toggleIsMarkerDragging(false))
          })
        }
      })

      markersLayer.addTo(map)

      return () => {
        map.removeLayer(markersLayer)
      }
    }
  }, [map, drawCoords, drawType, activeWaypointIndex])

  return null
}

export default RenderMarkers
