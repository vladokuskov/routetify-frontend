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
    if (drawType !== e && e === DrawType.Line) {
      dispatch(changeDraw(DrawType.Line))
    }
  }

  const handleDrawExit = () => {
    dispatch(changeDraw(DrawType.None))
  }

  return (
    <StyledSidebarSectionContent>
      <Button
        variant="primary"
        text="Line"
        onClick={() => handleDrawChange(DrawType.Line)}
        full="true"
        isDisabled={drawType === DrawType.Line ? 'true' : 'false'}
        icon={LineIcon}
      />
      {drawType !== DrawType.None && (
        <Button
          variant="outlined"
          icon={ClearIcon}
          onClick={handleDrawExit}
          status="danger"
          size="sm1"
        />
      )}
    </StyledSidebarSectionContent>
  )
}

export { Draw }
