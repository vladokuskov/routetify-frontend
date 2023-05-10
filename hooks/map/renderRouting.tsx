import { useRef, useState, useEffect } from 'react'

import * as L from 'leaflet'
import 'leaflet-routing-machine'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { DrawType } from '@/types/global/index.types'
import { updateExportCoords } from '@/redux/features/drawSlice'

const useRenderRouting = (e: L.Map | null) => {
  const [routingMachine, setRoutingMachine] = useState<L.Control | null>(null)
  const RoutingMachineRef = useRef<L.Control | null>(null)

  let key = process.env.NEXT_PUBLIC_MAPBOX_API

  const dispatch = useAppDispatch()

  const lineColor = useAppSelector(
    (state) => state.controlsReducer.colorPicker.color,
  )
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  useEffect(() => {
    if (!e) return
    if (e) {
      const plan = new L.Routing.Plan(drawCoords as any, {
        createMarker: function () {
          return false
        },
      })

      RoutingMachineRef.current = L.Routing.control({
        waypoints: drawCoords as any,
        router: L.Routing.mapbox(key ? key : '', {
          profile: 'mapbox/cycling',
        }),
        fitSelectedRoutes: false,
        show: false,
        routeWhileDragging: false,
        lineOptions: {
          styles: [{ color: lineColor, opacity: 1, weight: 6 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0,
          addWaypoints: false,
        },

        plan,
      })

      setRoutingMachine(RoutingMachineRef.current)

      return () => {
        if (RoutingMachineRef.current) {
          e.removeControl(RoutingMachineRef.current)
        }
      }
    }
  }, [e, drawCoords, lineColor, location])

  useEffect(() => {
    if (!routingMachine) return
    if (!e) return

    if (e) {
      if (routingMachine && drawType === DrawType.Road) {
        e.removeControl(routingMachine)
        routingMachine.addTo(e)
      } else if (routingMachine && drawType === DrawType.Hand) {
        e.removeControl(routingMachine)
      }
    }
  }, [routingMachine, drawType, e])

  useEffect(() => {
    if (!routingMachine) return

    if (routingMachine) {
      ;(routingMachine as any).on('routesfound', function (e: any) {
        dispatch(updateExportCoords(e.routes[0].coordinates))
      })
    }
  }, [routingMachine])
}

export default useRenderRouting
