import LayersIcon from '@/assets/icons/layers.svg'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { KeybindTooltip } from '@/components/ui/keybind-tooltip'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { mapConfig } from '@/config/map'
import { useClickOutside } from '@/hooks/useClickOutside'
import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/mapConfig.types'
import clsx from 'clsx'
import { useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="map"
              size="cube"
              aria-label="Select map tile layer"
              onClick={handleMenuOpen}
            >
              <Icon svg={LayersIcon} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} side="left" avoidCollisions>
            <p>
              Select map tile <KeybindTooltip>ALT+T</KeybindTooltip>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isMenuOpen && (
        <div
          className={clsx(
            'bg-dropdown border-2 border-dropdown-foreground absolute font-roboto font-semibold gap-1 right-11 bottom-0 rounded-md p-1 flex flex-col items-center justify-center shadow-md',
            'max-hsm:bottom-auto max-hsm:top-11 max-hsm:!right-0 w-28',
          )}
        >
          {availableLayers.map((layer) => {
            return (
              <Button
                variant="ghost"
                className="!shadow-none w-full"
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
