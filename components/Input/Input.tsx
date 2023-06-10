import clsx from 'clsx'
import Icon from '../Icon/Icon'
import { Input } from './Input.types'

const Input = ({
  variant = 'search',
  className,
  icon,
  loading,
  ...props
}: Input) => {
  return (
    <div className="w-full flex flex-col gap-1 relative">
      {icon && (
        <div className="absolute right-2 top-2 text-neutral-500">
          <Icon svg={icon} spin={loading} />
        </div>
      )}
      <input
        className={clsx(
          'w-full text-base rounded focus:outline-none font-roboto tracking-light transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'search' &&
            'bg-neutral-300 font-semibold placeholder:text-neutral-500 text-neutral-600 rounded-md hocus:bg-neutral-200 active:bg-neutral-400 !pr-10 py-2 pl-2',

          className,
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
