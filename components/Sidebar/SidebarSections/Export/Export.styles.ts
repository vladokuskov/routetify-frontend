import { styled } from 'styled-components'

const StyledExportButtonWrapper = styled.div<{ isSidebarOpen: boolean }>`
  background-color: #e2e2e2;
  border-radius: 10px;
  width: 100%;
  position: relative;
  font-family: var(--font-roboto), sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 650px) {
    flex-direction: ${({ isSidebarOpen }) =>
      isSidebarOpen ? 'row' : 'column'};
  }
`

const StyledExportButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  gap: 1rem;
  font-weight: 500;
  color: #5a5a5a;
`

const StyledExportSelectionButton = styled.button``

const StyledSelectionMenuWrapper = styled.div`
  position: absolute;
  right: 0;
`

const StyledSelectionMenuButton = styled.button``

export {
  StyledExportButtonWrapper,
  StyledExportButton,
  StyledExportSelectionButton,
  StyledSelectionMenuWrapper,
  StyledSelectionMenuButton,
}
