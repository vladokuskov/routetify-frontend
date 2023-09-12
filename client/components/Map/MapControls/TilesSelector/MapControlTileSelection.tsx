import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { useClickOutside } from '@/hooks/useClickOutside'
import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/layer.types'
import clsx from 'clsx'
import { useRef } from 'react'
import LayersIcon from '@/assets/icons/layers.svg'
import { TileButton } from './TileButton'
import { useHotkeys } from 'react-hotkeys-hook'

const MapControlTileSelection = () => {
  const ref = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useClickOutside(ref, false)

  const layer = useAppSelector((state) => state.controlsReducer.layer)
  const currentCoords = useAppSelector(
    (state) => state.controlsReducer.currentCoords,
  )

  const layers = [Layer.default, Layer.satellite]

  const dispatch = useAppDispatch()

  const handleTileSelect = (layer: Layer) => {
    dispatch(
      addLatLng({
        lat: currentCoords.lat,
        lng: currentCoords.lng,
      }),
    )
    dispatch(changeLayer(layer))
    setIsMenuOpen(false)
  }
  useHotkeys('alt+t', () => {
    if (layer === Layer.default) {
      handleTileSelect(Layer.satellite)
    } else {
      handleTileSelect(Layer.default)
    }
  })

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="map"
        title="Select map tile [ALT + T]"
        aria-label="Select map tile layer"
        onClick={handleMenuOpen}
      >
        <Icon svg={LayersIcon} />
      </Button>
      {isMenuOpen && (
        <div
          className={clsx(
            'absolute font-roboto font-semibold gap-1 right-11 bottom-0 rounded-md p-1 bg-app shadow flex flex-col items-center justify-center',
            'max-hsm:bottom-auto max-hsm:top-11 max-hsm:!right-0',
            'dark:bg-neutral-700',
          )}
        >
          {layers.map((tile, index) => {
            return (
              <TileButton
                key={index}
                handleTileSelect={handleTileSelect}
                selectedLayer={layer}
                tile={tile}
                aria-label={tile === Layer.default ? 'Default' : 'Satellite'}
              >
                {tile === Layer.default ? 'Default' : 'Satellite'}
              </TileButton>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { MapControlTileSelection }
