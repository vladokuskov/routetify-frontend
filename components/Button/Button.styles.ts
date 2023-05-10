import { css, styled } from 'styled-components'
import { Button } from './Button.types'

const StyledButton = styled.button<Button>`
  font-family: var(--font-roboto), sans-serif;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 16px;
  font-weight: 500;

  width: ${({ full }) => (full === 'true' ? '100%' : 'auto')};

  &:disabled {
    cursor: default;
  }

  ${({ variant }) =>
    variant === 'text' &&
    css`
      background-color: transparent;
      color: #333;
    `}
  ${({ variant, status }) =>
    variant === 'icon' &&
    css`
      background-color: #f8f6f6;
      color: ${status === 'error' || status === 'danger'
        ? '#E5342F'
        : status === 'success'
        ? '#468EE5'
        : '#3b6d52'};
      border-radius: 50%;
      padding: 0.4rem;

      -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.28);
      -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.28);
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.28);

      &:hover,
      &:focus {
        background-color: #f8f6f6;
        color: ${status === 'error' || status === 'danger'
          ? '#FB5F5B'
          : status === 'success'
          ? '#7AB6FF'
          : '#5d9b7a'};
      }

      &:active {
        background-color: #f8f6f6;
        color: ${status === 'error' || status === 'danger'
          ? '#E5342F'
          : status === 'success'
          ? '#468EE5'
          : '#3b6d52'};
      }

      &:disabled {
        background-color: #f8f6f6;
        color: #bdbdbd;
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
        background-color: #add5bf;
      }

      &:active {
        background-color: #a2c3b1;
      }

      &:disabled {
        background-color: #bdc8c2;
      }
    `};
`

const StyledIcon = styled.span``

const StyledText = styled.span``

export { StyledButton, StyledText, StyledIcon }
