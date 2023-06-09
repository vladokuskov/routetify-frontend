import { ReactNode } from 'react'
import {
  StyledSidebarSection,
  StyledSidebarSectionTitle,
  StyledSidebarSectionDescription,
  StyledSidebarSectionHeader,
} from './SidebarSection.styles'
import { useAppSelector } from '@/redux/hooks'

const SidebarSection = ({
  title,
  description,
  children,
}: {
  title?: string
  description?: string
  children: ReactNode
}) => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  return (
    <StyledSidebarSection>
      <StyledSidebarSectionHeader isSidebarOpen={isSidebarOpen}>
        {title && (
          <StyledSidebarSectionTitle>{title}</StyledSidebarSectionTitle>
        )}
        {description && (
          <StyledSidebarSectionDescription>
            {description}
          </StyledSidebarSectionDescription>
        )}
      </StyledSidebarSectionHeader>

      {children}
    </StyledSidebarSection>
  )
}

export { SidebarSection }
