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
import Icon from '../Icon/Icon'
import ArrowRightIcon from '../../assets/icons/arrow-right.svg'
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { toggleIsSidebarOpen } from '@/redux/features/controlsSlice'

const Sidebar = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

  const handleSidebarResize = () => {
    dispatch(toggleIsSidebarOpen())
  }

  return (
    <StyledSidebarContainer>
      <StyledDragButton
        onClick={handleSidebarResize}
        title={isSidebarOpen ? 'Hide sidebar' : 'Open sidebar'}
      >
        <Icon svg={isSidebarOpen ? ArrowRightIcon : ArrowLeftIcon} />
      </StyledDragButton>
      <StyledSidebarContent>
        <StyledDragDecoration />
        <SidebarSection
          title="Your location"
          description="Here you can find location"
        >
          <Geocoder />
        </SidebarSection>
        <SidebarSection
          title="Route details"
          description="Here you can view route details"
        >
          <Details />
        </SidebarSection>
        <SidebarSection
          title="Export route"
          description="You can export route in GPX/KML format"
        >
          <Export />
        </SidebarSection>
        <StyledSidebarFooter>
          {isSidebarOpen && (
            <StyledCopyrightTitle>&copy; Routetify</StyledCopyrightTitle>
          )}
        </StyledSidebarFooter>
      </StyledSidebarContent>
    </StyledSidebarContainer>
  )
}

export { Sidebar }
