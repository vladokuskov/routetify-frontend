'use client'

import { useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import { ResizeSidebarButton } from './ResizeSidebarButton/ResizeSidebarButton'
import { SidebarSections } from './SidebarSections/SidebarSections'

const Sidebar = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  return (
    <aside
      className={clsx(
        'absolute bg-background border-foreground z-20 overflow-y-visible no-scrollbar max-w-sidebar min-w-sidebarSmall right-0 top-0 mt-0 h-[100lvh] border-l-2 sidebarAnimation',
        isSidebarOpen ? 'w-sidebar p-4' : 'w-sidebarSmall p-1',
        'max-sm:!overflow-y-hidden max-sm:relative max-sm:p-4 max-sm:w-full max-sm:min-w-full max-sm:max-w-full max-sm:mt-[70vh] max-sm:shadow max-sm:border-t-2 max-sm:border-l-0 max-sm:min-h-[100lvh] max-sm:!h-full',
      )}
    >
      <ResizeSidebarButton />
      <figure
        className={clsx(
          'hidden bg-foreground rounded w-8 h-2 p-1 ml-auto mr-auto',
          'max-sm:flex',
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
      </div>
    </aside>
  )
}

export { Sidebar }
