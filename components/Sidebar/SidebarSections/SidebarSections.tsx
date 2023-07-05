import { SidebarSection } from '../SidebarSection'
import { Details } from './Details/Details'
import { Geocoder } from './Geocoder/Geocoder'
import { MovingPreferences } from './MovingPreferences/MovingPreferences'
import { RouteExport } from './RouteExport/RouteExport'
import { RouteUploading } from './RouteUploading/RouteUploading'

const SidebarSections = () => {
  return (
    <>
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
        title="Moving Preference"
        description="Choose your transportation"
      >
        <MovingPreferences />
      </SidebarSection>
      <SidebarSection
        title="Upload route"
        description="Route should be GPX or KML format"
      >
        <RouteUploading />
      </SidebarSection>
      <SidebarSection
        title="Export route"
        description="You can export route in GPX/KML format"
      >
        <RouteExport />
      </SidebarSection>
    </>
  )
}

export { SidebarSections }
