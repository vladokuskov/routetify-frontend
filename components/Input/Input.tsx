

import {
  StyledInput,
  StyledInputButton,
  StyledInputIcon,
  StyledInputMainWrapper,
} from './Input.styles';
import { TInput } from './Input.types';

const Input = ({
  variant,
  label,
  value,
  required,
  isPassShowed,
  icon,
  full = 'false',
  onChange,
  onClick,
  placeholder,
  name,
  fieldType = 'text',
  loading = 'false',
}: TInput) => {
  return (
    <StyledInputMainWrapper variant={variant} full={full}>
      {variant === 'search' && (
        <StyledInputIcon variant={variant} className="icon">
         
        </StyledInputIcon>
      )}
      <StyledInput
        loading={loading}
        type={
          fieldType === 'email'
            ? 'email'
            : fieldType === 'password' && !isPassShowed
            ? 'password'
            : fieldType === 'password' && isPassShowed
            ? 'text'
            : fieldType === 'number'
            ? 'number'
            : 'text'
        }
        name={name}
        value={value}
        variant={variant}
        title={label ? label : ''}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
      {variant === 'search' && value?.length !== 0 && loading !== 'true' && (
        <StyledInputButton
          type="button"
          onClick={onClick}
          variant={variant}
          title={variant === 'search' ? 'Clear' : ''}
        >
        
        </StyledInputButton>
      )}
    </StyledInputMainWrapper>
  );
};

export { Input };
