import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { useClickOutside } from '@/hooks/useClickOutside'
import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/layer.types'
import Image from 'next/image'
import { useRef } from 'react'
import LayersIcon from '../../../../assets/icons/layers.svg'
import {
  StyledIconWrapper,
  StyledTileButton,
  StyledTileSelectionMenu,
  StyledTileSelectionWrapper,
} from './MapControlTileSelection.styles'

const MapControlTileSelection = () => {
  const ref = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useClickOutside(ref, false)

  const layer = useAppSelector((state) => state.controlsReducer.layer)
  const currentCoords = useAppSelector(
    (state) => state.controlsReducer.currentCoords,
  )

  const dispatch = useAppDispatch()

  const handleTileSelect = (layer: Layer) => {
    dispatch(
      addLatLng({
        lat: currentCoords.lat,
        lng: currentCoords.lng,
      }),
    )
    dispatch(changeLayer(layer))
  }

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <StyledTileSelectionWrapper ref={ref}>
      <Button variant="map" title={'Change map tile'} onClick={handleMenuOpen}>
        <Icon svg={LayersIcon} />
      </Button>
      {isMenuOpen && (
        <StyledTileSelectionMenu>
          <StyledTileButton
            title="Default tile"
            disabled={layer === Layer.default}
            onClick={() => handleTileSelect(Layer.default)}
          >
            <StyledIconWrapper>
              <Image
                src="/default.webp"
                fill
                priority
                alt=""
                style={{ borderRadius: '4px' }}
              />
            </StyledIconWrapper>
            Default
          </StyledTileButton>
          <StyledTileButton
            title="Satellite tile"
            disabled={layer === Layer.satellite}
            onClick={() => handleTileSelect(Layer.satellite)}
          >
            <StyledIconWrapper>
              <Image
                src="/satellite.webp"
                fill
                priority
                alt=""
                style={{ borderRadius: '4px' }}
              />
            </StyledIconWrapper>
            Satellite
          </StyledTileButton>
        </StyledTileSelectionMenu>
      )}
    </StyledTileSelectionWrapper>
  )
}

export { MapControlTileSelection }
