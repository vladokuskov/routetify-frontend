import clsx from 'clsx'

type ButtonVariants = 'map' | 'tile'

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
        'rounded focus:outline-none font-roboto transition-colors ',
        'inline-flex gap-3 justify-center items-center text-center flex-nowrap whitespace-nowrap',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'map' &&
          'bg-app border-2 border-transparent text-neutral-800 hocus:bg-neutral-200 hocus:border-neutral-300 active:!border-neutral-400 hocus:shadow-md hocus:text-neutral-700 rounded-md !p-[0.35rem] shadow-md dark:bg-neutral-600 dark:hocus:text-neutral-100 dark:active:!border-neutral-300 dark:hocus:border-neutral-500 dark:text-neutral-300',
        variant === 'tile' &&
          'w-full border-2 border-transparent cursor-pointer p-1 rounded-md inline-flex items-center justify-between gap-2 text-neutral-800  hocus:text-neutral-950 hocus:bg-neutral-200 hocus:border-neutral-300 active:!border-neutral-400 dark:hocus:bg-neutral-600 dark:hocus:border-neutral-500 dark:active:!border-neutral-400 dark:text-neutral-300 dark:hocus:text-neutral-100',

        sizesClass[size],
        status === 'danger' && '!text-red-400',
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
