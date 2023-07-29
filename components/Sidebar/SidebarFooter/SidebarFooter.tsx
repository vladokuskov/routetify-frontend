import { useAppSelector } from '@/redux/hooks'

import BMCIcon from '@/assets/icons/bmc-logo.svg'
import clsx from 'clsx'

const SidebarFooter = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  return (
    <a
      className={clsx(
        'cursor-pointer w-full h-8 text-neutral-700 dark:text-neutral-300',
        'max-sm:block',
        !isSidebarOpen && 'hidden',
      )}
      aria-label="Buy me a coffee"
      href="https://bmc.link/swappnet"
      target="_blank"
    >
      <BMCIcon className="w-full h-full object-contain" />
    </a>
  )
}

export { SidebarFooter }
