import styled, { css } from 'styled-components';
import { TStyledContainer } from './StyledContainer.types';

const StyledContainer = styled.div<TStyledContainer>`
  ${({ variant }) =>
    variant === 'layout' &&
    css`
      max-height: 100%;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    `}
`;

export { StyledContainer };
