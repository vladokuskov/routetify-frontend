import {
  StyledDetailContainer,
  StyledDetailSubTitle,
  StyledDetailTitle,
} from './Detail.styles';
import { TDetail } from './Detail.types';

const Detail = ({ title, subTitle }: TDetail) => {
  return (
    <StyledDetailContainer>
      <StyledDetailTitle>{title}</StyledDetailTitle>
      <StyledDetailSubTitle>{subTitle}</StyledDetailSubTitle>
    </StyledDetailContainer>
  );
};

export { Detail };
