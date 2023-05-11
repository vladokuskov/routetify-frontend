import { css, styled } from 'styled-components'
import { Button } from './Button.types'

const ButtonSizes = {
  sm1: css`
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  `,
  sm2: css`
    padding: 0.45rem 1rem;
    font-size: 0.95rem;
  `,
  sm3: css`
    padding: 0.5rem 1.1rem;
    font-size: 1rem;
  `,
  md1: css`
    padding: 0.55rem 1.3rem;
    font-size: 1.125rem;
  `,
  md2: css`
    padding: 0.55rem 1.3rem;
    font-size: 1.25rem;
  `,
  md3: css`
    padding: 0.6rem 2rem;
    font-size: 1.375rem;
  `,
  xl1: css`
    padding: 0.6rem 2.5rem;
    font-size: 1.5rem;
  `,
  xl2: css`
    padding: 0.65rem 2.75rem;
    font-size: 1.625rem;
  `,
  xl3: css`
    padding: 0.65rem 2.95rem;
    font-size: 1.75rem;
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
  }

  ${({ size }) =>
    size === 'sm1'
      ? ButtonSizes.sm1
      : size === 'sm2'
      ? ButtonSizes.sm2
      : size === 'sm3'
      ? ButtonSizes.sm3
      : size === 'md1'
      ? ButtonSizes.md1
      : size === 'md2'
      ? ButtonSizes.md2
      : size === 'md3'
      ? ButtonSizes.md3
      : size === 'xl1'
      ? ButtonSizes.xl1
      : size === 'xl2'
      ? ButtonSizes.xl2
      : size === 'xl3'
      ? ButtonSizes.xl3
      : ''}

  ${({ variant, status }) =>
    variant === 'icon'
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

          &:disabled {
            background-color: #f8f6f6;
            color: #bdbdbd;
          }
        `
      : variant === 'primary'
      ? css`
          border-radius: 8px;
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

          &:disabled {
            background-color: #bdc8c2;
          }
        `
      : variant === 'outlined' &&
        css`
          border-radius: 8px;
          border: 0.15rem solid ${status === 'danger' ? '#E5342F' : '#a2c3b1'};
          background-color: transparent;
          color: ${status === 'danger' ? '#E5342F' : '#a2c3b1'};
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

          &:disabled {
            border-color: #bdc8c2;
            color: #bdc8c2;
          }
        `}
`

const StyledIcon = styled.span``

const StyledText = styled.span``

export { StyledButton, StyledText, StyledIcon }
