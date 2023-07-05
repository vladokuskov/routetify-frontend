import { useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'

const Copyright = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  return (
    <p>
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
    </p>
  )
}

export { Copyright }
