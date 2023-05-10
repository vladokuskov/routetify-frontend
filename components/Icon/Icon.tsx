import React from 'react'
import { Icon } from './Icon.types'
import { StyledIconWrapper } from './Icon.styles'

const Icon: React.FC<Icon> = ({
  svg: Icon,
  width = '24',
  height = '24',
  className = '',
  spin = 'false',
}) => {
  return (
    <StyledIconWrapper className={className} spin={spin}>
      <Icon width={width} height={height} />
    </StyledIconWrapper>
  )
}

export default Icon
