import { useState, useEffect } from 'react'
import { updateDrawCoords } from '../../redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { DrawType } from '@/types/global/drawType.types'

const useClickedCoords = (map: L.Map | null) => {
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const dispatch = useAppDispatch()

  const [clickedCoords, setClickedCoords] = useState<{
    lat: number
    lng: number
  } | null>(null)

  useEffect(() => {
    if (!map) return

    if (map) {
      if (drawType !== DrawType.None) {
        map.on('click', (e: { latlng: { lat: number; lng: number } }) => {
          setClickedCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
        })
      }
    }
  }, [map, drawType])

  useEffect(() => {
    if (clickedCoords && drawType !== DrawType.None) {
      dispatch(updateDrawCoords(clickedCoords))
    } else {
      setClickedCoords(null)
    }
  }, [clickedCoords])
}

export default useClickedCoords
