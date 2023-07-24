import { changeSidebarOpenState } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import { useEffect } from 'react'
import { ShowButton } from './ShowButton/ShowButton'

import { SidebarFooter } from './SidebarFooter/SidebarFooter'
import { SidebarSections } from './SidebarSections/SidebarSections'
import { ThemeSwitcher } from './SidebarSections/ThemeSwitcher/ThemeSwitcher'

const Sidebar = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

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
    <aside
      className={clsx(
        'absolute bg-app border-sidebar z-20 overflow-y-visible no-scrollbar max-w-sidebar min-w-sidebarSmall right-0 top-0 mt-0 h-[100lvh] border-l-2  ',
        'dark:bg-neutral-800 dark:border-neutral-600',
        isSidebarOpen ? 'w-sidebar p-4' : 'w-sidebarSmall p-1 sidebarAnimation',
        'max-sm:!overflow-y-hidden max-sm:relative max-sm:p-4 max-sm:w-full max-sm:min-w-full max-sm:max-w-full max-sm:mt-[70vh] max-sm:shadow max-sm:border-t-2 max-sm:border-l-0 max-sm:min-h-[100lvh] max-sm:!h-full',
      )}
    >
      <ShowButton />
      <figure
        className={clsx(
          'hidden bg-neutral-300 rounded w-8 h-2 p-1 ml-auto mr-auto',
          'max-sm:flex',
          'dark:bg-neutral-600',
        )}
      />
      <div
        className={clsx(
          'w-full h-full flex flex-col items-center justify-start gap-6 mx-auto my-0 overflow-y-scroll no-scrollbar',
          'max-sm:max-w-lg max-sm:p-2 max-sm:!overflow-y-hidden',
          isSidebarOpen ? 'p-2' : 'p-1',
        )}
      >
        <SidebarSections />
        <div className="flex flex-col items-center justify-center gap-5 mt-auto mb-4 max-sm:mt-12">
          <ThemeSwitcher />
          <SidebarFooter />
        </div>
      </div>
    </aside>
  )
}

export { Sidebar }
