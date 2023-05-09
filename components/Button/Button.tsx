
import { StyledButton, StyledIcon, StyledText } from './Button.styles';
import { TButton } from './Button.types';

const Button = ({
  variant = 'text',
  icon,
  text,
  onClick,
  disabled = false,
}: TButton) => {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      title={text}
      disabled={disabled}
    >
      {icon && (
        <StyledIcon>
        </StyledIcon>
      )}
      {text && <StyledText>{text}</StyledText>}
    </StyledButton>
  );
};

export { Button };
