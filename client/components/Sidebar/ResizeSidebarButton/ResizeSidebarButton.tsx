import ChevronLeftIcon from '@/assets/icons/chevron-left.svg'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg'
import Icon from '@/components/Icon/Icon'
import { toggleIsSidebarOpen } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import { useEffect } from 'react'

const ResizeSidebarButton = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  const map = useAppSelector((state) => state.controlsReducer.map)

  const dispatch = useAppDispatch()

  const handleSidebarResize = () => {
    dispatch(toggleIsSidebarOpen())
  }

  useEffect(() => {
    if (map) {
      map.invalidateSize()
    }
  }, [isSidebarOpen])

  return (
    <button
      className={clsx(
        'absolute py-2 w-7 rounded-l-md -left-7 top-1/2 border-2 border-foreground z-30 bg-background text-paragraph !bg-opacity-90',
        'transition-colors hocus:!border-neutral-400',
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
