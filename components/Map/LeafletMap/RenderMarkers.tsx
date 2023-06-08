import { toggleIsMarkerDragging } from '@/redux/features/controlsSlice'
import { updateDraggedMarkerCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import * as L from 'leaflet'
import { useEffect } from 'react'

const RenderMarkers = ({ map }: { map: L.Map | null }) => {
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const markersLayer = L.layerGroup()

    if (map) {
      drawCoords.forEach((coords: any, i) => {
        let lastIndex = drawCoords.length - 1
        let iconUrl = ''
        let iconSize: [number, number] = [0, 0]
        let iconAnchor: [number, number] = [0, 0]

        if (i === 0) {
          iconUrl = 'map/start-marker.svg'
          iconSize = [33, 33]
          iconAnchor = [6, 25]
        } else if (i > 0 && i < lastIndex) {
          iconUrl = 'map/mid-marker.svg'
          iconSize = [20, 20]
          iconAnchor = [10, 10]
        } else if (i === lastIndex && drawCoords.length > 1) {
          iconUrl = 'map/finish-marker.svg'
          iconSize = [33, 33]
          iconAnchor = [13, 32]
        }

        const marker = L.marker(coords, {
          alt: '',
          icon: L.icon({
            iconUrl,
            iconSize,
            iconAnchor,
            className: `${drawType === DrawType.None && 'cursorCrosshair'}`,
          }),

          draggable: drawType === DrawType.Line,
        }).addTo(markersLayer)

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
        }
      })

      markersLayer.addTo(map)

      return () => {
        map.removeLayer(markersLayer)
      }
    }
  }, [map, drawCoords, drawType])

  return null
}

export default RenderMarkers
