import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { undoDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import UndoIcon from '../../../../assets/icons/undo.svg'
import { useKeyDown } from '@/hooks/useKeyDown'

const MapControlUndoAction = () => {
  const dispatch = useAppDispatch()
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  const handleUndo = () => {
    if (drawCoords.length > 0 && drawType !== DrawType.None) {
      dispatch(undoDrawCoords(null))
    }
  }

  useKeyDown(() => {
    handleUndo()
  }, ['KeyZ'])

  return (
    <Button
      variant="map"
      aria-label="Undo action [Z]"
      onClick={handleUndo}
      disabled={drawCoords.length === 0 || drawType === DrawType.None}
    >
      <Icon svg={UndoIcon} />
    </Button>
  )
}

export { MapControlUndoAction }
