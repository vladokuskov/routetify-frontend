import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useEffect } from 'react'

import * as L from 'leaflet'
import { updateDraggedMarkerCoords } from '@/redux/features/drawSlice'
import { DrawType } from '@/types/global/drawType.types'
import { toggleIsMarkerDragging } from '@/redux/features/controlsSlice'

const useRenderMarkers = (e: L.Map | null) => {
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  const dispatch = useAppDispatch()

  useEffect((): ReturnType<L.Map | any> => {
    const markersLayer = L.layerGroup()
    if (e) {
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

        return marker
      })

      markersLayer.addTo(e)
      return () => e.removeLayer(markersLayer)
    }
  }, [drawCoords, drawType])
}

export default useRenderMarkers
