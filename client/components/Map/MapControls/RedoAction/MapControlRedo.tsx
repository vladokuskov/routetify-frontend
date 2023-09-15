import { Button } from '@/components/ui/button'
import Icon from '@/components/Icon/Icon'
import { redoDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import RedoIcon from '@/assets/icons/redo.svg'
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
    <Button
      variant="map"
      size="cube"
      title="Redo action [ALT + X]"
      aria-label="Redo action"
      onClick={handleRedo}
      disabled={
        (drawCoordsFuture.length === 0 && drawCoordsDeleted.length === 0) ||
        drawType === DrawType.None
      }
    >
      <Icon svg={RedoIcon} />
    </Button>
  )
}

export { MapControlRedoAction }
