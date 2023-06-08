import { Button } from '@/components/Button/Button'
import { changeDraw } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import LineIcon from '../../../../assets/icons/line.svg'
import ClearIcon from '../../../../assets/icons/x.svg'

import Icon from '@/components/Icon/Icon'
import { useKeyDown } from '@/hooks/useKeyDown'
import { DrawType } from '@/types/global/drawType.types'

const MapControlDrawSelection = () => {
  const dispatch = useAppDispatch()

  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  const handleDrawChange = (e: DrawType) => {
    dispatch(changeDraw(e))
  }

  useKeyDown(() => {
    if (drawType !== DrawType.None) {
      dispatch(changeDraw(DrawType.None))
    }
  }, ['Escape'])

  return (
    <Button
      variant="map"
      title={drawType === DrawType.Line ? 'Stop drawing' : 'Draw line'}
      onClick={() =>
        handleDrawChange(
          drawType !== DrawType.None ? DrawType.None : DrawType.Line,
        )
      }
      status={drawType === DrawType.Line ? 'danger' : 'default'}
    >
      <Icon svg={drawType === DrawType.Line ? ClearIcon : LineIcon} />
    </Button>
  )
}

export { MapControlDrawSelection }
