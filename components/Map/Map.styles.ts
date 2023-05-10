import { styled } from 'styled-components'

const StyledMapMainContainer = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 70vh;
  top: 0;
  right: 0;
  left: 0;
  @media (min-width: 530px) {
    height: 100%;
    margin-left: calc(18.75rem);
    width: calc(100% - 18.75rem);
  }
`

const StyledMapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
`

export { StyledMapMainContainer, StyledMapContainer }
