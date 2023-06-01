import { changeLayer } from '@/redux/features/controlsSlice'
import { Button } from '@/components/Button/Button'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/layer.types'
import { useRef } from 'react'
import Icon from '@/components/Icon/Icon'
import LayersIcon from '../../../../assets/icons/layers.svg'
import {
  StyledTileButton,
  StyledTileSelectionMenu,
  StyledTileSelectionWrapper,
} from './MapControlTileSelection.styles'
import { useClickOutside } from '@/hooks/useClickOutside'
import Image from 'next/image'

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
            <span>
              <Image
                src="/default.webp"
                width={20}
                height={20}
                priority
                alt=""
                style={{ borderRadius: '4px' }}
              />
            </span>
            Default
          </StyledTileButton>
          <StyledTileButton
            title="Satellite tile"
            disabled={layer === Layer.satellite}
            onClick={() => handleTileSelect(Layer.satellite)}
          >
            <span>
              <Image
                src="/satellite.webp"
                width={20}
                height={20}
                priority
                alt=""
                style={{ borderRadius: '4px' }}
              />
            </span>
            Satellite
          </StyledTileButton>
        </StyledTileSelectionMenu>
      )}
    </StyledTileSelectionWrapper>
  )
}

export { MapControlTileSelection }
