import { styled } from 'styled-components'

const StyledMapMainOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1003;
  pointer-events: none;
`

const StyledMapOverlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const StyledMapMainControls = styled.div<{ isSidebarOpen: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  top: 1.75rem;
  padding: 0.5rem 0.8rem;
  padding-right: 0;
  z-index: 1004;
  pointer-events: visible;
  @media (min-width: 650px) {
    right: ${({ isSidebarOpen }) => (isSidebarOpen ? '19.3rem' : '4.5rem')};
  }
  @media (max-height: 550px) {
    padding: 0 !important;
    display: flex;
    top: 0.7rem;
  }
`

const StyledMapControls = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  @media (max-height: 550px) {
    flex-direction: row;
  }

  @media (min-width: 650px) {
    right: ${({ isSidebarOpen }) => (isSidebarOpen ? '19.3rem' : '4rem')};
  }
`

const StyledMapZoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 5rem;
  height: 100%;
`

export {
  StyledMapMainControls,
  StyledMapMainOverlay,
  StyledMapOverlay,
  StyledMapZoomWrapper,
  StyledMapControls,
}
