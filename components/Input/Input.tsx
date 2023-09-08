import clsx from 'clsx'
import Icon from '../Icon/Icon'

type inputVariant = 'search'

export interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: inputVariant
  className?: string
  icon?: React.ReactNode
}

const Input = ({ variant = 'search', className, icon, ...props }: Input) => {
  return (
    <div className="w-full flex flex-col gap-1 relative">
      {icon && (
        <div className="absolute right-2 top-2 text-neutral-500 pointer-events-none z-40 cursor-none">
          {icon}
        </div>
      )}
      <input
        className={clsx(
          'w-full text-base rounded focus:outline-none font-roboto tracking-light transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'search' &&
            'bg-neutral-300 font-semibold placeholder:text-neutral-500 text-neutral-600 rounded-md hocus:bg-neutral-200 active:bg-neutral-400 !pr-10 py-2 pl-2 z-30',

          className,
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
