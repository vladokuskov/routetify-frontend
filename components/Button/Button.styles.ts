import { css, styled } from 'styled-components'
import { Button } from './Button.types'

const ButtonSizes = {
  small: css`
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  `,
  regular: css`
    padding: 0.5rem 1.1rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 0.55rem 1.3rem;
    font-size: 1.25rem;
  `,
}

const StyledButton = styled.button<Button>`
  font-family: var(--font-roboto), sans-serif;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ full }) => (full === 'true' ? '100%' : 'auto')};

  &:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 50%;
  }

  ${({ size }) =>
    size === 'small'
      ? ButtonSizes.small
      : size === 'regular'
      ? ButtonSizes.regular
      : size === 'large'
      ? ButtonSizes.large
      : ''}

  ${({ variant, status }) =>
    variant === 'map'
      ? css`
          background-color: #f8f6f6;
          color: ${status === 'danger'
            ? '#E5342F'
            : status === 'success'
            ? '#468EE5'
            : '#3b6d52'};
          border-radius: 50%;
          padding: 0.4rem;
          box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.28);

          &:hover,
          &:focus {
            background-color: #f8f6f6;
            color: ${status === 'danger'
              ? '#FB5F5B'
              : status === 'success'
              ? '#7AB6FF'
              : '#5d9b7a'};
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.28);
          }

          &:active {
            background-color: #f8f6f6;
            color: ${status === 'danger'
              ? '#E5342F'
              : status === 'success'
              ? '#468EE5'
              : '#3b6d52'};
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.28);
          }
        `
      : variant === 'primary'
      ? css`
          border-radius: 8px;
          border: 0.15rem solid transparent;
          background-color: #a2c3b1;
          color: #424242;
          gap: 0.5rem;
          &:hover,
          &:focus {
            background-color: #add5bf;
          }

          &:active {
            background-color: #a2c3b1;
          }
        `
      : variant === 'outlined' &&
        css`
          border-radius: 8px;
          border: 0.15rem solid ${status === 'danger' ? '#E5342F' : '#a2c3b1'};
          background-color: ${status === 'danger' ? '#E5342F' : 'transparent'};
          color: ${status === 'danger' ? '#f8f6f6' : '#a2c3b1'};
          gap: 0.5rem;
          &:hover,
          &:focus {
            border-color: ${status === 'danger' ? '#FB5F5B' : '#a2c3b1'};
            background-color: ${status === 'danger' ? '#FB5F5B' : '#a2c3b1'};
            color: #f8f6f6;
          }

          &:active {
            border-color: ${status === 'danger' ? '#E5342F' : '#a2c3b1'};
            color: ${status === 'danger' ? '#E5342F' : '#a2c3b1'};
          }
        `}
`

export { StyledButton }
