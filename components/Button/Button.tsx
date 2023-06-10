import clsx from 'clsx'
import { Button } from './Button.types'

const sizesClass = {
  large: 'px-5 py-3 text-base',
  small: 'px-2 py-2',
  regular: 'px-4 py-2 text-sm',
}

const Button = ({
  variant = 'map',
  status,
  size = 'regular',
  children,
  className,
  ...props
}: Button) => {
  return (
    <button
      className={clsx(
        'rounded focus:outline-none font-roboto transition-colors',
        'inline-flex gap-3 justify-center items-center text-center flex-nowrap whitespace-nowrap',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'map' &&
          'bg-app text-neutral-800 hocus:bg-neutral-200 hocus:shadow-md hocus:text-neutral-700 rounded-md !px-2 !py-2 shadow-md',
        variant === 'routeType' &&
          'w-full p-1 text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 rounded-md transition-colors',

        sizesClass[size],
        status === 'danger' && '!text-red-500',
        status === 'success' && '!text-blue-500',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
