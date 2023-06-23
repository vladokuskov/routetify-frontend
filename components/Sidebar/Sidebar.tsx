import {
  changeSidebarOpenState,
  toggleIsSidebarOpen,
} from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg'
import ArrowRightIcon from '../../assets/icons/arrow-right.svg'
import Icon from '../Icon/Icon'
import { SidebarSection } from './SidebarSection'
import { Details } from './SidebarSections/Details/Details'
import { Export } from './SidebarSections/Export/Export'
import { Geocoder } from './SidebarSections/Geocoder/Geocoder'
import { MovingPreferences } from './SidebarSections/MovingPreferences/MovingPreferences'
import { useEffect } from 'react'
import { RouteUploading } from './SidebarSections/RouteUploading/RouteUploading'
import { ThemeSwitcher } from './SidebarSections/ThemeSwitcher/ThemeSwitcher'

const Sidebar = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

  const handleSidebarResize = () => {
    dispatch(toggleIsSidebarOpen())
  }

  useEffect(() => {
    const sidebarOpenState = localStorage.getItem('sidebarOpenState')

    if (sidebarOpenState) {
      const parsedSidebarOpenState = JSON.parse(sidebarOpenState) as boolean

      dispatch(changeSidebarOpenState(parsedSidebarOpenState))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebarOpenState', JSON.stringify(isSidebarOpen))
  }, [isSidebarOpen])

  return (
    <div
      className={clsx(
        'absolute overflow-y-visible no-scrollbar max-w-sidebar min-w-sidebarSmall right-0 top-0 mt-0 h-[100lvh] bg-app z-20 transform transition-transform border-l-2 border-sidebar',
        'dark:bg-neutral-800 dark:border-neutral-600',
        isSidebarOpen ? 'w-sidebar p-4' : 'w-sidebarSmall p-1',
        'max-sm:!overflow-y-hidden max-sm:relative max-sm:p-4 max-sm:w-full max-sm:min-w-full max-sm:max-w-full max-sm:mt-[70vh] max-sm:shadow max-sm:border-t-2 max-sm:border-l-0 max-sm:min-h-[100lvh] max-sm:!h-full',
      )}
    >
      <button
        className={clsx(
          'absolute p-2 rounded-full -left-6 top-1/2 bg-neutral-10 border-2 border-sidebar z-30 bg-neutral-100 text-neutral-400',
          'transition-colors hocus:bg-neutral-200 hocus:text-neutral-500',
          'dark:bg-neutral-700 dark:text-neutral-400 dark:hocus:bg-neutral-600 dark:border-neutral-400',
          'max-sm:hidden max-hsm:-left-12 max-hsm:bottom-4 max-hsm:top-auto',
        )}
        onClick={handleSidebarResize}
        title={isSidebarOpen ? 'Hide sidebar' : 'Open sidebar'}
      >
        <Icon svg={isSidebarOpen ? ArrowRightIcon : ArrowLeftIcon} />
      </button>
      <div
        className={clsx(
          'w-full h-full flex flex-col items-center justify-start gap-6 mx-auto my-0 overflow-y-scroll no-scrollbar',
          'max-sm:max-w-lg max-sm:p-2 max-sm:!overflow-y-hidden',
          isSidebarOpen ? 'p-2' : 'p-1',
        )}
      >
        <div
          className={clsx(
            'hidden bg-neutral-300 rounded w-8 h-2 p-1',
            'max-sm:flex',
          )}
        />
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
          <Export />
        </SidebarSection>
        <div className="flex flex-col items-center justify-center gap-5 mt-auto mb-4 max-sm:mt-12">
          <ThemeSwitcher />
          <a
            href="https://github.com/swappnet/routetify"
            rel="noopener noreferrer"
            target="_blank"
            className={clsx(
              'font-roboto text-neutral-300 font-semibold cursor-pointer hocus:text-neutral-400 transition-colors',
              'max-sm:block',

              !isSidebarOpen && 'hidden',
            )}
          >
            &copy; Routetify
          </a>
        </div>
      </div>
    </div>
  )
}

export { Sidebar }
