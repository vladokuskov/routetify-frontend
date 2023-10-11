import { toggleIsMarkerDragging } from '@/redux/features/controlsSlice'
import {
  updateActiveWaypoint,
  updateDraggedMarkerCoords,
} from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import * as L from 'leaflet'
import { useEffect } from 'react'
import '../../../styles/map.css'

const getMarker = (isActive: boolean) =>
  `<div class="marker ${isActive && 'marker-active'}"></div>`

const getStartFlag = (isActive: boolean) =>
  `<div class="flagpole ${isActive && 'flag-active'}">
    <div class="flag flag-start"></div>
  </div>`

const getFinishFlag = (isActive: boolean) =>
  `<div class="flagpole ${isActive && 'flag-active'}">
    <div class="flag flag-finish"></div>
  </div>`

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
          markerOptions.icon = L.divIcon({
            html: getStartFlag(activeWaypointIndex === i),
            iconSize: [33, 33],
            iconAnchor: [2, 20],
            className: `${drawType === DrawType.None && 'cursorCrosshair'}`,
          })
        } else if (i > 0 && i < lastIndex) {
          markerOptions.icon = L.divIcon({
            html: getMarker(activeWaypointIndex === i),
            iconSize: [12, 12],
            iconAnchor: [6, 6],
            className: `${drawType === DrawType.None && 'cursorCrosshair'}`,
          })
        } else if (i === lastIndex && drawCoords.length > 1) {
          markerOptions.icon = L.divIcon({
            html: getFinishFlag(activeWaypointIndex === i),
            iconSize: [33, 33],
            iconAnchor: [0, 20],
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
