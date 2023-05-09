import styled, { css } from 'styled-components';

import { TInput } from './Input.types';

const StyledInputMainWrapper = styled.div<TInput>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  margin: 0;
  ${({ variant, full }) =>
    css`
      background-color: ${variant === 'search' ? '#DDDDDD' : 'transparent'};
      color: ${variant === 'search' ? '#474747' : '#2C2C2C'};
      border-radius: ${variant === 'search' ? '0.5rem' : '0.625rem'};
      border: none;
      width: ${full === 'true' ? '100%' : 'auto'};
    `};

  ${({ variant }) =>
    css`
      &:hover,
      &:focus {
        .icon {
          color: ${variant === 'search' && '#7a7a7ab3'};
        }
      }
    `}

  .icon {
    pointer-events: none;
  }
`;

const StyledInput = styled.input<TInput>`
  font-family: var(--font-roboto), sans-serif;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-weight: 500;
  color: #696969;
  transition: 0.2s;
  -webkit-tap-highlight-color: transparent;
  ::placeholder {
    opacity: 0.3;
    font-weight: 400;
    font-size: 0.9rem;
  }

  ${({ variant }) =>
    variant === 'search' &&
    css`
      padding: 0.35rem 1.7rem 0.35rem 0.3rem;
      border: 2px solid transparent;
      border-radius: 0.5rem;
    `}

  &:hover {
    ${({ variant }) =>
      variant === 'search' &&
      css`
        background-color: #e6e6e66e;
        border-color: transparent;
      `}
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  *:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
    outline-offset: 0;
    border-color: #3b6d52 !important;

    ${({ variant }) =>
      variant === 'search' &&
      css`
        background-color: #e6e6e66e;
        border-radius: 0.5rem;
      `}
  }
`;

const StyledInputButton = styled.button<TInput>`
  position: absolute;
  padding: 0 0.5rem;
  border-radius: 0.25rem;

  ${({ variant }) =>
    variant === 'search' &&
    css`
      color: #5a5a5a;
      right: 0;
    `}
`;

const StyledInputIcon = styled.span<TInput>`
  transition: 0.2s;
  position: absolute;
  left: 0.5rem;

  ${({ variant }) =>
    variant === 'search' &&
    css`
      left: auto;
      right: 0.4rem;
      color: #5a5a5ab3;
    `}
`;

export {
  StyledInput,
  StyledInputButton,
  StyledInputIcon,
  StyledInputMainWrapper,
};
