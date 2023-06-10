import { styled } from 'styled-components'

const StyledDetailsMainContainer = styled.div<{ isSidebarOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  background-color: #d8d8ff;
  border-radius: 10px;
  @media (min-width: 650px) {
    flex-direction: ${({ isSidebarOpen }) =>
      isSidebarOpen ? 'row' : 'column'};
    max-width: ${({ isSidebarOpen }) => (isSidebarOpen ? '100%' : '3.2rem')};
  }
`

const StyledSeparationLine = styled.hr<{ isSidebarOpen: boolean }>`
  @media (min-width: 650px) {
    height: ${({ isSidebarOpen }) => (isSidebarOpen ? '90%' : 'auto')};
    width: ${({ isSidebarOpen }) => (isSidebarOpen ? 'auto' : '90%')};
  }
  height: 90%;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 8px;
`

export { StyledDetailsMainContainer, StyledSeparationLine }
