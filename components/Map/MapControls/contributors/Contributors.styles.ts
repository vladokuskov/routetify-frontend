import { styled } from 'styled-components'

const StyledContributorsLink = styled.a`
  font-family: var(--font-roboto), sans-serif;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0.15rem;
  background-color: #f8f6f680;
  font-size: 0.8rem;
  pointer-events: all;
  color: #2c2c2c;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

export { StyledContributorsLink }
