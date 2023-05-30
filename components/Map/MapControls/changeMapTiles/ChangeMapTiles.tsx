import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/layer.types'
import { StyledChangeMapTilesButton } from './ChangeMapTiles.styles'
import Image from 'next/image'

const ChangeMapTiles = () => {
  const layer = useAppSelector((state) => state.controlsReducer.layer)
  const currentCoords = useAppSelector(
    (state) => state.controlsReducer.currentCoords,
  )

  const dispatch = useAppDispatch()

  const handleLayerChange = () => {
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
  return (
    <StyledChangeMapTilesButton onClick={handleLayerChange}>
      <Image
        priority
        title={layer === Layer.satellite ? 'Default tile' : 'Satellite tile'}
        src={layer === Layer.satellite ? '/default.webp' : '/satellite.webp'}
        width={70}
        height={70}
        style={{
          borderRadius: '4px',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        alt=""
      />
    </StyledChangeMapTilesButton>
  )
}

export { ChangeMapTiles }
