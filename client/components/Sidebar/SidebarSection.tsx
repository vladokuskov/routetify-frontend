import { useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import { ReactNode } from 'react'

const SidebarSection = ({
  title,
  description,
  children,
}: {
  title?: string
  description?: string
  children: ReactNode
}) => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  return (
    <section className="w-full flex flex-col items-center justify-center gap-4">
      <div
        className={clsx(
          'w-full flex flex-col items-start justify-center gap-1 font-roboto',
          'max-sm:block',
          !isSidebarOpen && 'hidden',
        )}
      >
        {title && (
          <h2
            className={clsx(
              'text-xl font-semibold text-neutral-600 tracking-tight',
              'dark:text-neutral-300',
            )}
          >
            {title}
          </h2>
        )}
        {description && (
          <p className=" text-base leading-4 font-normal text-neutral-400">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

export { SidebarSection }
