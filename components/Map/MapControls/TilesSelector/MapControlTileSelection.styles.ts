import { styled } from 'styled-components'

const StyledTileSelectionWrapper = styled.div`
  position: relative;
`

const StyledTileSelectionMenu = styled.div`
  position: absolute;
  right: 2.7rem;
  bottom: 0;
  border-radius: 8px;
  padding: 0.3rem 0.2rem;
  background-color: #f8f6f6;
  font-family: var(--font-roboto), sans-serif;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.3rem;

  @media (max-height: 550px) {
    bottom: auto;
    top: 2.8rem;
    right: 0.8rem;
  }
`

const StyledTileButton = styled.button`
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  border: 0.15rem solid transparent;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  color: #2c2c2c;
  gap: 1rem;
  width: 100%;
  padding: 0.1rem 0.2rem;
  &:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 50%;
  }
  &:hover,
  &:focus {
    color: #454545;
  }

  &:active {
    color: #1f1f1f;
  }
`

export { StyledTileSelectionWrapper, StyledTileSelectionMenu, StyledTileButton }
