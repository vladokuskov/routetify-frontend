import { Button } from '@/components/Button/Button'
import LineIcon from '../../../../assets/icons/line.svg'
import ClearIcon from '../../../../assets/icons/x.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeDraw } from '@/redux/features/controlsSlice'

import { DrawType } from '@/types/global/drawType.types'
import { useKeyDown } from '@/hooks/useKeyDown'

const MapControlDraw = () => {
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
      variant="icon"
      text={drawType === DrawType.Line ? 'Stop drawing' : 'Draw line'}
      icon={drawType === DrawType.Line ? ClearIcon : LineIcon}
      onClick={() =>
        handleDrawChange(
          drawType !== DrawType.None ? DrawType.None : DrawType.Line,
        )
      }
      status={drawType === DrawType.Line ? 'danger' : 'default'}
    />
  )
}

export { MapControlDraw }
