import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { redoDrawCoords } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { DrawType } from '@/types/global/drawType.types'
import RedoIcon from '../../../../assets/icons/redo.svg'

const MapControlRedoAction = () => {
  const dispatch = useAppDispatch()
  const drawCoordsFuture = useAppSelector(
    (state) => state.drawReducer.drawCoordsFuture,
  )
  const drawCoordsDeleted = useAppSelector(
    (state) => state.drawReducer.drawCoordsDeleted,
  )
  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  return (
    <Button
      variant="map"
      title={'Redo action'}
      onClick={() => dispatch(redoDrawCoords(null))}
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
