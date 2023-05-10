import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Button } from '../.../../../../Button/Button'
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles'
import { changeDraw } from '@/redux/features/controlsSlice'
import { DrawType } from '@/types/global/index.types'
import RoadIcon from '../../../../assets/icons/road.svg'
import HandIcon from '../../../../assets/icons/hand.svg'

const Draw = () => {
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const dispatch = useAppDispatch()

  const handleDrawChange = (e: DrawType) => {
    if (drawType === e) {
      dispatch(changeDraw(DrawType.None))
    } else if (drawType !== e && e === DrawType.Road) {
      dispatch(changeDraw(DrawType.Road))
    } else if (drawType !== e && e === DrawType.Hand) {
      dispatch(changeDraw(DrawType.Hand))
    }
  }

  return (
    <StyledSidebarSectionContent>
      <Button
        variant="iconWithText"
        text="Road"
        onClick={() => handleDrawChange(DrawType.Road)}
        full="true"
        isDisabled={drawType === DrawType.Road ? 'true' : 'false'}
        icon={RoadIcon}
      />
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
