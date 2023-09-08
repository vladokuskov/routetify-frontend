import clsx from 'clsx'

type ButtonVariants = 'map' | 'routeType' | 'tile'

type ButtonStatus = 'default' | 'success' | 'danger'

type ButtonSizes = 'small' | 'regular' | 'large'

export interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  size?: ButtonSizes
  className?: string
  status?: ButtonStatus
  children: React.ReactNode
}

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
          'bg-app dark:bg-neutral-600 text-neutral-800 dark:text-neutral-300 hocus:bg-neutral-200 dark:hocus:bg-neutral-500 hocus:shadow-md hocus:text-neutral-700 dark:hocus:text-neutral-100 rounded-md !px-2 !py-2 shadow-md ',
        variant === 'routeType' &&
          'w-full p-1 text-neutral-700 hocus:bg-neutral-200 hocus:text-neutral-500 rounded-md transition-colors',
        variant === 'tile' &&
          'w-full cursor-pointer p-1 rounded-md inline-flex items-center justify-between gap-2 text-neutral-700 dark:text-neutral-200 hocus:text-neutral-600 dark:hocus:text-neutral-100 hocus:bg-neutral-200 dark:hocus:bg-neutral-500',

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
