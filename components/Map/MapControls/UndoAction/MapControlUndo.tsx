import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { undoDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import UndoIcon from '../../../../assets/icons/undo.svg'

const MapControlUndoAction = () => {
  const dispatch = useAppDispatch()
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  return (
    <Button
      variant="map"
      title={'Undo action'}
      onClick={() => dispatch(undoDrawCoords(null))}
      disabled={drawCoords.length === 0 || drawType === DrawType.None}
    >
      <Icon svg={UndoIcon} />
    </Button>
  )
}

export { MapControlUndoAction }
