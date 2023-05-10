import Icon from '../Icon/Icon'
import { StyledButton, StyledIcon, StyledText } from './Button.styles'
import { Button } from './Button.types'

const Button = ({
  variant = 'text',
  icon,
  text,
  onClick,
  isDisabled = 'false',
  full = 'false',
  status,
  loading,
}: Button) => {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      title={text}
      disabled={isDisabled === 'true' ? true : false}
      full={full}
      status={status}
    >
      {icon && variant !== 'text' && (
        <Icon svg={icon} spin={loading === 'true' ? 'true' : 'false'} />
      )}
      {text && variant !== 'icon' && <StyledText>{text}</StyledText>}
    </StyledButton>
  )
}

export { Button }
