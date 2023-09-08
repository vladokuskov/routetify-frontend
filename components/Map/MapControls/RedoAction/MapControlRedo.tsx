import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { redoDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import RedoIcon from '@/assets/icons/redo.svg'
import { useKeyDown } from '@/hooks/useKeyDown'

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

  useKeyDown(() => {
    handleRedo()
  }, ['KeyX'])

  return (
    <Button
      variant="map"
      aria-label="Redo action [X]"
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
