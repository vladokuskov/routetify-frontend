import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/layer.types'
import { Button } from '@/components/Button/Button'
import { useState } from 'react'
import Icon from '@/components/Icon/Icon'
import LayersIcon from '../../../../assets/icons/layers.svg'

const MapControlTileSelection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const layer = useAppSelector((state) => state.controlsReducer.layer)
  const currentCoords = useAppSelector(
    (state) => state.controlsReducer.currentCoords,
  )

  const dispatch = useAppDispatch()

  const handleTileChange = () => {
    if (layer === Layer.satellite) {
      dispatch(
        addLatLng({
          lat: currentCoords.lat,
          lng: currentCoords.lng,
        }),
      )
      window.scrollTo(0, 0)
      dispatch(changeLayer(Layer.default))
    } else if (layer === Layer.default) {
      dispatch(
        addLatLng({
          lat: currentCoords.lat,
          lng: currentCoords.lng,
        }),
      )
      dispatch(changeLayer(Layer.satellite))
      window.scrollTo(0, 0)
    }
  }

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <Button variant="map" title={'Change map tile'} onClick={handleMenuOpen}>
      <Icon svg={LayersIcon} />
    </Button>
  )
}

export { MapControlTileSelection }
