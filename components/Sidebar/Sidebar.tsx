import {
  StyledDragDecoration,
  StyledSidebarContainer,
  StyledSidebarContent,
  StyledLogoImage,
} from './Sidebar.styles'
import { Geocoder } from './SidebarSections/Geocoder/Geocoder'
import { SidebarSection } from './SidebarSection/SidebarSection'
import { Export } from './SidebarSections/Export/Export'
import { Details } from './SidebarSections/Details/Details'

const Sidebar = () => {
  return (
    <StyledSidebarContainer>
      <StyledSidebarContent>
        <StyledDragDecoration />
        <StyledLogoImage
          src="logo.svg"
          width={200}
          height={50}
          priority
          alt=""
        />
        <SidebarSection>
          <Details />
        </SidebarSection>
        <SidebarSection title="Location">
          <Geocoder />
        </SidebarSection>
        <SidebarSection title="Export">
          <Export />
        </SidebarSection>
      </StyledSidebarContent>
    </StyledSidebarContainer>
  )
}

export { Sidebar }
