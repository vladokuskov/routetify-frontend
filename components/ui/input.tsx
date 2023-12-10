import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import Icon from './icon'
import SearchIcon from '@/assets/icons/search.svg'

const inputVariants = cva(
  'flex h-10 w-full rounded-md px-3 py-2 font-semibold text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-background border-2 border-input placeholder:!text-paragraph/80',
        map: 'bg-input-map text-input-map-foreground placeholder:input-map-foreground/90 rounded-md !pr-10 !py-2 !pl-2 z-30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return variant === 'default' || !variant ? (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    ) : variant === 'map' ? (
      <div className="w-full flex flex-col gap-1 relative">
        <Icon
          svg={SearchIcon}
          className="absolute right-2 top-2 text-neutral-500 pointer-events-none z-40 cursor-none"
        />
        <input
          type={type}
          className={cn(inputVariants({ variant, className }))}
          ref={ref}
          {...props}
        />
      </div>
    ) : (
      <></>
    )
  },
)
Input.displayName = 'Input'

export { Input }
