import { Button } from '@/components/Button/Button'
import UndoIcon from '../../../../assets/icons/undo.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { undoDrawCoords } from '@/redux/features/drawSlice'
import { DrawType } from '@/types/global/drawType.types'

const MapControlUndo = () => {
  const dispatch = useAppDispatch()
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  return (
    <Button
      variant="icon"
      text="Undo"
      icon={UndoIcon}
      onClick={() => dispatch(undoDrawCoords(null))}
      isDisabled={
        drawCoords.length === 0 || drawType === DrawType.None ? 'true' : 'false'
      }
    />
  )
}

export { MapControlUndo }
