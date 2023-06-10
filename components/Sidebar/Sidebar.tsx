import { toggleIsSidebarOpen } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg'
import ArrowRightIcon from '../../assets/icons/arrow-right.svg'
import Icon from '../Icon/Icon'
import { SidebarSection } from './SidebarSection/SidebarSection'
import { Details } from './SidebarSections/Details/Details'
import { Export } from './SidebarSections/Export/Export'
import { Geocoder } from './SidebarSections/Geocoder/Geocoder'

const Sidebar = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

  const handleSidebarResize = () => {
    dispatch(toggleIsSidebarOpen())
  }
  return (
    <div
      className={clsx(
        'absolute overflow-visible max-w-sidebar min-w-sidebarSmall right-0 top-0 mt-0 h-[100lvh] bg-app z-20  transition-transform border-l-2 border-sidebar ',
        isSidebarOpen ? 'w-sidebar p-4' : 'w-sidebarSmall p-1',
        'max-sm:relative max-sm:p-4 max-sm:w-full max-sm:min-w-full max-sm:max-w-full max-sm:mt-[70vh] max-sm:shadow-md max-sm:shadow-black max-sm:border-t-2 max-sm:border-l-0',
      )}
    >
      <button
        className={clsx(
          'absolute p-2 rounded-full left-[-1.25rem] top-1/2 bg-neutral-10 border-2 border-sidebar z-30 bg-neutral-100 text-neutral-400',
          'transition-colors hocus:bg-neutral-200 hocus:text-neutral-500',
          'max-sm:hidden',
        )}
        onClick={handleSidebarResize}
        title={isSidebarOpen ? 'Hide sidebar' : 'Open sidebar'}
      >
        <Icon svg={isSidebarOpen ? ArrowRightIcon : ArrowLeftIcon} />
      </button>
      <div
        className={clsx(
          'w-full h-full flex flex-col items-center justify-start gap-4 mx-auto my-0 overflow-hidden',
          'max-sm:max-w-lg max-sm:p-2',
          isSidebarOpen ? 'p-2' : 'p-1',
        )}
      >
        <div
          className={clsx(
            'hidden bg-neutral-300 rounded w-10 h-2',
            'max-sm:block',
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
          title="Export route"
          description="You can export route in GPX/KML format"
        >
          <Export />
        </SidebarSection>
        <div className="flex flex-ol items-center justify-center gap-5 mt-auto mb-4">
          <h3
            className={clsx(
              'font-roboto text-neutral-300 font-semibold ',
              'max-sm:block',
              !isSidebarOpen && 'hidden',
            )}
          >
            &copy; Routetify
          </h3>
        </div>
      </div>
    </div>
  )
}

export { Sidebar }
