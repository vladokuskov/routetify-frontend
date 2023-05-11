import { Button } from '@/components/Button/Button'
import LineIcon from '../../../../assets/icons/line.svg'
import ClearIcon from '../../../../assets/icons/x.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeDraw } from '@/redux/features/controlsSlice'

import { DrawType } from '@/types/global/drawType.types'

const MapControlDraw = () => {
  const dispatch = useAppDispatch()

  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  const handleDrawChange = (e: DrawType) => {
    dispatch(changeDraw(e))
  }

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
