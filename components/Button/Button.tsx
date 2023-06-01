import { StyledButton } from './Button.styles'
import { Button } from './Button.types'

const Button = ({
  variant = 'primary',
  full = 'false',
  status,
  size = 'regular',
  children,
  ...props
}: Button) => {
  return (
    <StyledButton
      variant={variant}
      full={full}
      status={status}
      size={size}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export { Button }
