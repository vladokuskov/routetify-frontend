import RepeatIcon from '@/assets/icons/repeat.svg'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { KeybindTooltip } from '@/components/ui/keybind-tooltip'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { reverseRoute } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useHotkeys } from 'react-hotkeys-hook'

const MapControlReverseRoute = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const handleRouteReverse = () => {
    if (drawCoords.length > 0) {
      dispatch(reverseRoute())
    }
  }

  useHotkeys('alt+r', handleRouteReverse)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="map"
            size="cube"
            aria-label="Reverse route"
            onClick={handleRouteReverse}
            disabled={drawCoords.length === 0}
          >
            <Icon svg={RepeatIcon} />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={5} side="left" avoidCollisions>
          <p>
            Reverse route <KeybindTooltip>ALT+R</KeybindTooltip>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { MapControlReverseRoute }
