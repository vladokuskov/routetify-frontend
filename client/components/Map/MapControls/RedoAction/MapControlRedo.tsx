import RedoIcon from '@/assets/icons/redo.svg'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { KeybindTooltip } from '@/components/ui/keybind-tooltip'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { redoDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import { useHotkeys } from 'react-hotkeys-hook'

const MapControlRedoAction = () => {
  const dispatch = useAppDispatch()
  const drawCoordsFuture = useAppSelector(
    (state) => state.drawReducer.drawCoordsFuture,
  )
  const drawCoordsDeleted = useAppSelector(
    (state) => state.drawReducer.drawCoordsDeleted,
  )
  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  const handleRedo = () => {
    if (
      (drawCoordsFuture.length > 0 && drawCoordsDeleted.length > 0) ||
      drawType !== DrawType.None
    ) {
      dispatch(redoDrawCoords(null))
    }
  }

  useHotkeys('alt+x', handleRedo)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="map"
            size="cube"
            aria-label="Redo action"
            onClick={handleRedo}
            disabled={
              (drawCoordsFuture.length === 0 &&
                drawCoordsDeleted.length === 0) ||
              drawType === DrawType.None
            }
          >
            <Icon svg={RedoIcon} />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={5} side="left" avoidCollisions>
          <p>
            Redo action <KeybindTooltip>ALT+X</KeybindTooltip>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { MapControlRedoAction }
