import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from '../.../../../../Button/Button';
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles';
import { changeDraw } from '@/redux/features/controlsSlice';

const Draw = () => {
  const drawType = useAppSelector((state) => state.controlsReducer.draw);
  const dispatch = useAppDispatch();

  const handleDrawChange = (e: string) => {
    if (drawType === e) {
      dispatch(changeDraw('None'));
    } else if (drawType !== e && e === 'Road') {
      dispatch(changeDraw('Road'));
    } else if (drawType !== e && e === 'Hand') {
      dispatch(changeDraw('Hand'));
    }
  };

  return (
    <StyledSidebarSectionContent>
      <Button
        variant="iconWithText"
        text="Road"
        onClick={() => handleDrawChange('Road')}
        full="true"
      />
      <Button
        variant="iconWithText"
        text="Hand"
        onClick={() => handleDrawChange('Hand')}
        full="true"
      />
    </StyledSidebarSectionContent>
  );
};

export { Draw };
