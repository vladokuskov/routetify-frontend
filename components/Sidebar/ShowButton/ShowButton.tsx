import Icon from '@/components/Icon/Icon'
import { toggleIsSidebarOpen } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import ArrowLeftIcon from '../../../assets/icons/arrow-left.svg'
import ArrowRightIcon from '../../../assets/icons/arrow-right.svg'

const ShowButton = () => {
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
        'absolute p-2 rounded-full -left-6 top-1/2 bg-neutral-10 border-2 border-sidebar z-30 bg-neutral-100 text-neutral-400',
        'transition-colors hocus:text-neutral-500 hocus:!border-neutral-400',
        'dark:bg-neutral-700 dark:text-neutral-300 dark:hocus:border-neutral-400 dark:border-neutral-600 dark:hocus:text-neutral-200',
        'max-sm:hidden max-hsm:-left-12 max-hsm:bottom-12 max-hsm:top-auto',
      )}
      onClick={handleSidebarResize}
      aria-label={isSidebarOpen ? 'Hide sidebar' : 'Open sidebar'}
    >
      <Icon svg={isSidebarOpen ? ArrowRightIcon : ArrowLeftIcon} />
    </button>
  )
}

export { ShowButton }
