import { styled } from 'styled-components'

const StyledSidebarSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`

const StyledSidebarSectionHeader = styled.div<{ isSidebarOpen: boolean }>`
  @media (min-width: 650px) {
    display: ${({ isSidebarOpen }) => (isSidebarOpen ? 'block' : 'none')};
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 0.2rem;
`

const StyledSidebarSectionTitle = styled.h3`
  font-family: var(--font-inter), sans-serif;
  font-size: 1.3rem;
  line-height: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #616161;
`

const StyledSidebarSectionDescription = styled.p`
  font-family: var(--font-inter), sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: -0.035em;
  color: #adadad;
`

const StyledSidebarSectionContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

export {
  StyledSidebarSection,
  StyledSidebarSectionTitle,
  StyledSidebarSectionContent,
  StyledSidebarSectionDescription,
  StyledSidebarSectionHeader,
}
