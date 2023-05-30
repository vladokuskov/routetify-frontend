import { styled } from 'styled-components'

const StyledChangeMapTilesButton = styled.button`
  border-radius: 8px;
  font-family: var(--font-roboto), sans-serif;
  pointer-events: all;
  position: absolute;
  top: 30rem;
  height: 3rem;
  width: 3rem;
  right: 0.5rem;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.28);
  border: 2px solid #dddddd;
  @media (min-width: 650px) {
    right: 19.3rem;
    top: auto;
    bottom: 1.5rem;
    height: 3.5rem;
    width: 3.5rem;
  }
`
export { StyledChangeMapTilesButton }
