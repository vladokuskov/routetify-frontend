import clsx from 'clsx'
import React from 'react'

type Icon = {
  svg: React.FC<React.SVGProps<SVGSVGElement>>
  size?: number
  className?: string
  spin?: Boolean
}

const Icon: React.FC<Icon> = ({
  svg: Icon,
  size = 24,
  className = '',
  spin = false,
}) => {
  return (
    <span
      className={clsx(
        'flex items-center justify-center',
        spin === true && 'animate-spin',
        className,
      )}
    >
      <Icon width={size} height={size} />
    </span>
  )
}

export default Icon
