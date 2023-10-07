import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useClickOutside } from '@/hooks/useClickOutside'
import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import { useRef } from 'react'
import LayersIcon from '@/assets/icons/layers.svg'
import { useHotkeys } from 'react-hotkeys-hook'
import { mapConfig } from '@/config/map'
import { Layer } from '@/types/global/mapConfig.types'

const MapControlTileSelection = () => {
  const ref = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useClickOutside(ref, false)

  const selectedLayer = useAppSelector((state) => state.controlsReducer.layer)
  const currentCoords = useAppSelector(
    (state) => state.controlsReducer.currentCoords,
  )

  const availableLayers = mapConfig.layers

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
    const currentIndex = availableLayers.findIndex(
      (layer) => layer === selectedLayer,
    )
    const nextIndex = (currentIndex + 1) % availableLayers.length
    const nextLayer = availableLayers[nextIndex]

    handleTileSelect(nextLayer)
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
            'bg-map absolute font-roboto  font-semibold gap-1 right-11 bottom-0 rounded-md p-1 flex flex-col items-center justify-center shadow-md',
            'max-hsm:bottom-auto max-hsm:top-11 max-hsm:!right-0 w-28',
          )}
        >
          {availableLayers.map((layer) => {
            return (
              <Button
                variant="map"
                className="!shadow-none hover:bg-neutral-200 dark:hover:bg-neutral-500 w-full"
                key={layer.url}
                onClick={() => handleTileSelect(layer)}
                aria-label={layer.title}
                disabled={selectedLayer === layer}
              >
                {layer.title}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { MapControlTileSelection }
