import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useClickOutside } from '@/hooks/useClickOutside'
import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/layer.types'
import clsx from 'clsx'
import { useRef } from 'react'
import LayersIcon from '@/assets/icons/layers.svg'
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
        size="cube"
        title="Select map tile [ALT + T]"
        aria-label="Select map tile layer"
        onClick={handleMenuOpen}
      >
        <Icon svg={LayersIcon} />
      </Button>
      {isMenuOpen && (
        <div
          className={clsx(
            'bg-map absolute font-roboto font-semibold gap-1 right-11 bottom-0 rounded-md p-1 flex flex-col items-center justify-center shadow-md',
            'max-hsm:bottom-auto max-hsm:top-11 max-hsm:!right-0',
          )}
        >
          {layers.map((tile, index) => {
            return (
              <Button
                variant="map"
                className="!shadow-none hover:bg-neutral-200 dark:hover:bg-neutral-500"
                key={index}
                onClick={() => handleTileSelect(tile)}
                aria-label={tile === Layer.default ? 'Default' : 'Satellite'}
                disabled={tile === layer}
              >
                <img
                  src={`/icons/${
                    tile === Layer.default
                      ? 'default'
                      : tile === Layer.satellite
                      ? 'satellite'
                      : null
                  }.webp`}
                  alt=""
                  width={30}
                  height={30}
                  style={{ borderRadius: '4px' }}
                />
                {tile === Layer.default ? 'Default' : 'Satellite'}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { MapControlTileSelection }
