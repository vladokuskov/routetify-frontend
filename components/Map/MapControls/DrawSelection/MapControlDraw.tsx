import { Button } from '@/components/Button/Button'
import { changeDraw } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import LineIcon from '@/assets/icons/line.svg'
import ClearIcon from '@/assets/icons/x.svg'

import Icon from '@/components/Icon/Icon'
import { DrawType } from '@/types/global/drawType.types'
import { useHotkeys } from 'react-hotkeys-hook'

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
    <Button
      variant="map"
      title="Draw line [ALT + L]"
      aria-label={drawType === DrawType.Line ? 'Stop drawing' : 'Draw line'}
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
