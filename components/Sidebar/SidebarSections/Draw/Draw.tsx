import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Button } from '../.../../../../Button/Button'
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles'
import { changeDraw } from '@/redux/features/controlsSlice'
import LineIcon from '../../../../assets/icons/line.svg'
import ClearIcon from '../../../../assets/icons/x.svg'
import { DrawType } from '@/types/global/drawType.types'

const Draw = () => {
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const dispatch = useAppDispatch()

  const handleDrawChange = (e: DrawType) => {
    if (drawType !== e) {
      dispatch(changeDraw(e))
    }
  }

  const handleDrawExit = () => {
    dispatch(changeDraw(DrawType.None))
  }

  return (
    <StyledSidebarSectionContent>
      <Button
        variant={drawType !== DrawType.None ? 'outlined' : 'primary'}
        text={drawType !== DrawType.None ? 'Exit drawing' : 'Line'}
        onClick={() =>
          handleDrawChange(
            drawType !== DrawType.None ? DrawType.None : DrawType.Line,
          )
        }
        full="true"
        icon={drawType !== DrawType.None ? ClearIcon : LineIcon}
        status={drawType !== DrawType.None ? 'danger' : 'default'}
      />
    </StyledSidebarSectionContent>
  )
}

export { Draw }
