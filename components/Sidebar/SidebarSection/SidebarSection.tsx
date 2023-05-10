import { ReactNode } from 'react'
import {
  StyledSidebarSection,
  StyledSidebarSectionTitle,
} from './SidebarSection.styles'

const SidebarSection = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <StyledSidebarSection>
      <StyledSidebarSectionTitle>{title}</StyledSidebarSectionTitle>
      {children}
    </StyledSidebarSection>
  )
}

export { SidebarSection }
