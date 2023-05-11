import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Button } from '../.../../../../Button/Button'
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles'
import { changeDraw } from '@/redux/features/controlsSlice'
import { DrawType } from '@/types/global/index.types'
import HandIcon from '../../../../assets/icons/hand.svg'

const Draw = () => {
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const dispatch = useAppDispatch()

  const handleDrawChange = (e: DrawType) => {
    if (drawType !== e && e === DrawType.Hand) {
      dispatch(changeDraw(DrawType.Hand))
    }
  }

  return (
    <StyledSidebarSectionContent>
      <Button
        variant="iconWithText"
        text="Hand"
        onClick={() => handleDrawChange(DrawType.Hand)}
        full="true"
        isDisabled={drawType === DrawType.Hand ? 'true' : 'false'}
        icon={HandIcon}
      />
    </StyledSidebarSectionContent>
  )
}

export { Draw }
