import Icon from '../Icon/Icon'
import { StyledButton, StyledIcon, StyledText } from './Button.styles'
import { Button } from './Button.types'

const Button = ({
  variant = 'primary',
  icon,
  text,
  onClick,
  isDisabled = 'false',
  full = 'false',
  status,
  loading,
  size = 'sm3',
}: Button) => {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      title={text}
      disabled={isDisabled === 'true' ? true : false}
      full={full}
      status={status}
      size={size}
    >
      {text && variant !== 'icon' && <StyledText>{text}</StyledText>}
      {icon && <Icon svg={icon} spin={loading === 'true' ? 'true' : 'false'} />}
    </StyledButton>
  )
}

export { Button }
