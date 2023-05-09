import { StyledButton, StyledIcon, StyledText } from './Button.styles';
import { Button } from './Button.types';

const Button = ({
  variant = 'text',
  icon,
  text,
  onClick,
  isDisabled = 'false',
  full = 'false',
}: Button) => {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      title={text}
      disabled={isDisabled === 'true' ? true : false}
      full={full}
    >
      {icon && <StyledIcon></StyledIcon>}
      {text && <StyledText>{text}</StyledText>}
    </StyledButton>
  );
};

export { Button };
