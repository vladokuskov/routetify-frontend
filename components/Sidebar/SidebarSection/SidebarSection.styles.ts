import { styled } from 'styled-components'

const StyledSidebarSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
`

const StyledSidebarSectionTitle = styled.h3`
  font-family: var(--font-inter), sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.033em;
  color: #3b6d52;
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
}
