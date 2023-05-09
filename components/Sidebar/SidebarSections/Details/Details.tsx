import { useAppSelector } from '@/redux/hooks';
import { Detail } from './Detail/Detail';
import { StyledDetailsMainContainer } from './Details.styles';

const Details = () => {
  const { time, dist } = useAppSelector((state) => state.drawReducer.drawInfo);

  return (
    <StyledDetailsMainContainer>
      <Detail title={time} subTitle="Time, h" />
      <Detail title={dist} subTitle="Dist, km" />
    </StyledDetailsMainContainer>
  );
};

export { Details };
