import LineIcon from '@/assets/icons/line.svg'
import ClearIcon from '@/assets/icons/x.svg'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { changeDraw } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import Icon from '@/components/ui/icon'
import { DrawType } from '@/types/global/drawType.types'
import { useHotkeys } from 'react-hotkeys-hook'
import { KeybindTooltip } from '@/components/ui/keybind-tooltip'

const MapControlDrawSelection = () => {
  const dispatch = useAppDispatch()

  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  const handleDrawChange = (e: DrawType) => {
    dispatch(changeDraw(e))
  }

  useHotkeys('esc', () => {
    if (drawType !== DrawType.None) {
      dispatch(changeDraw(DrawType.None))
    }
  })

  useHotkeys('alt+l', () =>
    handleDrawChange(
      drawType !== DrawType.None ? DrawType.None : DrawType.Line,
    ),
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="map"
            size="cube"
            aria-label={
              drawType === DrawType.Line ? 'Stop drawing' : 'Draw route'
            }
            onClick={() =>
              handleDrawChange(
                drawType !== DrawType.None ? DrawType.None : DrawType.Line,
              )
            }
          >
            <Icon svg={drawType === DrawType.Line ? ClearIcon : LineIcon} />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={5} side="left" avoidCollisions>
          <p>
            Draw route <KeybindTooltip>ALT+L</KeybindTooltip>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { MapControlDrawSelection }
