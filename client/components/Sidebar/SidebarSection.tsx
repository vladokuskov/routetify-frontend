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
          <h2 className="text-xl font-semibold text-title tracking-tight">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-base leading-4 font-normal text-paragraph">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

export { SidebarSection }
