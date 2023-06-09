import { styled } from 'styled-components'

const StyledGeocoderContainer = styled.div<{ isSidebarOpen: boolean }>`
  @media (min-width: 650px) {
    display: ${({ isSidebarOpen }) => (isSidebarOpen ? 'block' : 'none')};
  }
  font-family: var(--font-roboto), sans-serif;
  position: relative;
  width: 100%;
`

const StyledGeocoderResultsContainer = styled.ul`
  position: absolute;
  top: 2.7rem;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 5px 15px -1px rgba(0, 0, 0, 0.09);
  background-color: #e5e5e5;
  z-index: 2;
`

const StyledGeocoderResult = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(138, 138, 138);
  &:last-child {
    border-bottom: none;
  }
  button {
    width: 100%;
    padding: 0.7rem;
    color: #2c2c2c;

    &:hover,
    &:focus {
      opacity: 0.5;
    }

    &:active {
      opacity: 1;
    }
  }
`

const StyledGeocoderAltButton = styled.button<{ isSidebarOpen: boolean }>`
  @media (min-width: 650px) {
    display: ${({ isSidebarOpen }) => (isSidebarOpen ? 'none' : 'block')};
  }
  display: none;
  background: #dddddd;
  box-shadow: 0px 6px 5px -5px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  color: #b5b5b5;
  width: 3.2rem;
  height: 3.2rem;

  &:hover,
  &:focus {
    background-color: #e7e7e7;
  }

  &:active {
    background-color: #dddddd;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  *:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }
`

export {
  StyledGeocoderContainer,
  StyledGeocoderResultsContainer,
  StyledGeocoderResult,
  StyledGeocoderAltButton,
}
