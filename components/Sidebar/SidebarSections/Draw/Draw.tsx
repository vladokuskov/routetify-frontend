import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Button } from '../.../../../../Button/Button'
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles'
import { changeDraw } from '@/redux/features/controlsSlice'
import { DrawType } from '@/types/global/index.types'
import HandIcon from '../../../../assets/icons/hand.svg'
import ClearIcon from '../../../../assets/icons/x.svg'

const Draw = () => {
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const dispatch = useAppDispatch()

  const handleDrawChange = (e: DrawType) => {
    if (drawType !== e && e === DrawType.Line) {
      dispatch(changeDraw(DrawType.Line))
    }
  }

  return (
    <StyledSidebarSectionContent>
      <Button
        variant="iconWithText"
        text="Hand"
        onClick={() => handleDrawChange(DrawType.Line)}
        full="true"
        isDisabled={drawType === DrawType.Line ? 'true' : 'false'}
        icon={HandIcon}
      />
      {drawType !== DrawType.None && <Button icon={ClearIcon} />}
    </StyledSidebarSectionContent>
  )
}

export { Draw }
