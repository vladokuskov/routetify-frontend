import FitIcon from '@/assets/icons/fit.svg'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { KeybindTooltip } from '@/components/ui/keybind-tooltip'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import fitBounds from '@/lib/fitBounds'
import { changeLocationStatus } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import { useHotkeys } from 'react-hotkeys-hook'

const MapControlFitRoute = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const map = useAppSelector((state) => state.controlsReducer.map)

  const handleRouteFit = () => {
    if (drawCoords.length > 0) {
      dispatch(changeLocationStatus(LocationStatus.idle))

      fitBounds(map, drawCoords)
    }
  }

  useHotkeys('alt+o', handleRouteFit)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="map"
            size="cube"
            aria-label="Fit route"
            onClick={handleRouteFit}
            disabled={drawCoords.length === 0}
          >
            <Icon svg={FitIcon} />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={5} side="left" avoidCollisions>
          <p>
            Fit route <KeybindTooltip>ALT+O</KeybindTooltip>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { MapControlFitRoute }
