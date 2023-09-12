import Icon from '@/components/Icon/Icon'
import { toggleIsSidebarOpen } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg'

const ResizeSidebarButton = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const dispatch = useAppDispatch()

  const handleSidebarResize = () => {
    dispatch(toggleIsSidebarOpen())
  }

  return (
    <button
      className={clsx(
        'absolute py-2 w-7 rounded-l-md -left-7 top-1/2 border-2 border-sidebar z-30 bg-neutral-100 text-neutral-400 !bg-opacity-90',
        'transition-colors hocus:text-neutral-500 hocus:!border-neutral-400',
        'dark:bg-neutral-700 dark:text-neutral-300 dark:hocus:border-neutral-500 dark:active:!border-neutral-300 dark:border-neutral-600 dark:hocus:text-neutral-200',
        'max-sm:hidden max-dsm:bottom-12 max-dsm:top-auto',
      )}
      onClick={handleSidebarResize}
      aria-label={isSidebarOpen ? 'Hide sidebar' : 'Open sidebar'}
    >
      <Icon svg={isSidebarOpen ? ChevronRightIcon : ChevronLeftIcon} />
    </button>
  )
}

export { ResizeSidebarButton }