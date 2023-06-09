import {
  StyledDragDecoration,
  StyledSidebarContainer,
  StyledSidebarContent,
  StyledDragButton,
  StyledCopyrightTitle,
  StyledSidebarFooter,
} from './Sidebar.styles'
import { Geocoder } from './SidebarSections/Geocoder/Geocoder'
import { SidebarSection } from './SidebarSection/SidebarSection'
import { Export } from './SidebarSections/Export/Export'
import { Details } from './SidebarSections/Details/Details'

const Sidebar = () => {
  return (
    <StyledSidebarContainer>
      <StyledDragButton />
      <StyledSidebarContent>
        <StyledDragDecoration />
        <SidebarSection>
          <Details />
        </SidebarSection>
        <SidebarSection title="Location">
          <Geocoder />
        </SidebarSection>
        <SidebarSection title="Export">
          <Export />
        </SidebarSection>
        <StyledSidebarFooter>
          <StyledCopyrightTitle>&copy; Routetify</StyledCopyrightTitle>
        </StyledSidebarFooter>
      </StyledSidebarContent>
    </StyledSidebarContainer>
  )
}

export { Sidebar }
