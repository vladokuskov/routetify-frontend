import ArrowRightIcon from '@/assets/icons/arrow-right.svg'
import Icon from '@/components/Icon/Icon'
import { Route } from '@/types/global/export.types'
import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface IRouteExportButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'default' | 'compact' | 'type'
  selectedType: Route
  routeType?: Route
  isArrow?: boolean
}

const RouteExportButton = ({
  variant,
  selectedType,
  routeType,
  isArrow = false,
  ...props
}: IRouteExportButton) => {
  const { GPX, KML } = Route
  return (
    <>
      {variant === 'type' && (
        <button
          disabled={selectedType === routeType}
          className={clsx(
            'w-full p-1 text-neutral-800 hocus:bg-neutral-200 hocus:text-neutral-950 rounded-md transition-colors',
          )}
          aria-label={
            routeType === GPX ? 'GPX export format' : 'KML export format'
          }
          title={routeType === GPX ? 'GPX export format' : 'KML export format'}
          {...props}
        >
          {routeType === GPX ? 'GPX' : 'KML'}
        </button>
      )}
      {variant === 'compact' && (
        <button
          className={clsx(
            'w-full flex flex-col justify-center items-center gap-1 p-3 text-neutral-800 hocus:bg-neutral-200 hocus:text-neutral-950 rounded-md transition-colors',
            'max-sm:!hidden',
            'relative pb-8',
          )}
          aria-label={
            selectedType === GPX ? 'GPX export format' : 'KML export format'
          }
          title={
            selectedType === GPX ? 'GPX export format' : 'KML export format'
          }
          {...props}
        >
          <span>{selectedType === GPX ? 'GPX' : 'KML'}</span>
          <Icon
            svg={ArrowRightIcon}
            className={clsx(
              'absolute bottom-5 h-1',
              'transform transition-transform',
              isArrow && 'animate-moveRight',
            )}
          />
        </button>
      )}
    </>
  )
}

export { RouteExportButton }
