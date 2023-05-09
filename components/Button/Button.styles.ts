import { css, styled } from 'styled-components';
import { TButton } from './Button.types';

const StyledButton = styled.button<TButton>`
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  ${({ variant }) =>
    variant === 'text' &&
    css`
      background-color: transparent;
      color: #333;
    `}
  ${({ variant }) =>
    variant === 'icon' &&
    css`
      background-color: #333;
      color: #fff;

      &:hover {
        background-color: #555;
      }
    `}
    ${({ variant }) =>
    variant === 'iconWithText' &&
    css`
      border-radius: 8px;
      background-color: #a2c3b1;
      color: #424242;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &:hover,
      &:focus {
        background-color: #bed2c7;
      }

      &:active {
        background-color: #a2c3b1;
      }
    `};
`;

const StyledIcon = styled.span``;

const StyledText = styled.span``;

export { StyledButton, StyledText, StyledIcon };
