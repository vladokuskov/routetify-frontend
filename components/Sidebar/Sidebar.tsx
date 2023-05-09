import {
  StyledDragDecoration,
  StyledSidebarContainer,
  StyledSidebarContent,
} from './Sidebar.styles';
import { Geocoder } from './SidebarSections/Geocoder/Geocoder';
import { SidebarSection } from './SidebarSection/SidebarSection';
import { Draw } from './SidebarSections/Draw/Draw';
import { Layer } from './SidebarSections/Layer/Layer';
import { Export } from './SidebarSections/Export/Export';
import { Details } from './SidebarSections/Details/Details';

const Sidebar = () => {
  return (
    <StyledSidebarContainer>
      <StyledSidebarContent>
        <StyledDragDecoration />
        <SidebarSection title="Details">
          <Details />
        </SidebarSection>
        <SidebarSection title="Location">
          <Geocoder />
        </SidebarSection>
        <SidebarSection title="Draw">
          <Draw />
        </SidebarSection>
        <SidebarSection title="Layer">
          <Layer />
        </SidebarSection>
        <SidebarSection title="Export">
          <Export />
        </SidebarSection>
      </StyledSidebarContent>
    </StyledSidebarContainer>
  );
};

export { Sidebar };
