import UndoIcon from '@/assets/icons/undo.svg'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { KeybindTooltip } from '@/components/ui/keybind-tooltip'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { undoDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import { useHotkeys } from 'react-hotkeys-hook'

const MapControlUndoAction = () => {
  const dispatch = useAppDispatch()
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const drawCoordsChanges = useAppSelector(
    (state) => state.drawReducer.drawCoordsChanges,
  )

  const handleUndo = () => {
    if (drawCoords.length > 0 && drawType !== DrawType.None) {
      dispatch(undoDrawCoords())
    }
  }

  useHotkeys('alt+z', handleUndo)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="map"
            size="cube"
            aria-label="Undo action"
            onClick={handleUndo}
            disabled={
              drawCoordsChanges.length === 0 || drawType === DrawType.None
            }
          >
            <Icon svg={UndoIcon} />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={5} side="left" avoidCollisions>
          <p>
            Undo action <KeybindTooltip>ALT+Z</KeybindTooltip>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { MapControlUndoAction }
