import Icon from '../Icon/Icon'
import {
  StyledInput,
  StyledInputButton,
  StyledInputIcon,
  StyledInputMainWrapper,
} from './Input.styles'
import { Input } from './Input.types'

import ClearIcon from '../../assets/icons/x.svg'
import SearchIcon from '../../assets/icons/search.svg'
import LoadingIcon from '../../assets/icons/loader.svg'

const Input = ({
  variant,
  label,
  value,
  full = 'false',
  onChange,
  onClick,
  placeholder,
  name,
  fieldType = 'text',
  loading = 'false',
}: Input) => {
  return (
    <StyledInputMainWrapper variant={variant} full={full}>
      {variant === 'search' && (
        <StyledInputIcon variant={variant} className="icon">
          {loading === 'true' && (
            <Icon
              svg={LoadingIcon}
              spin={loading === 'true' ? 'true' : 'false'}
            />
          )}
          {loading === 'false' && value?.length === 0 && (
            <Icon svg={SearchIcon} />
          )}
        </StyledInputIcon>
      )}
      <StyledInput
        loading={loading}
        type={
          fieldType === 'email'
            ? 'email'
            : fieldType === 'password'
            ? 'password'
            : fieldType === 'number'
            ? 'number'
            : 'text'
        }
        name={name}
        value={value}
        variant={variant}
        title={label ? label : ''}
        onChange={onChange}
        placeholder={placeholder}
      />
      {variant === 'search' && value?.length !== 0 && loading !== 'true' && (
        <StyledInputButton
          type="button"
          onClick={onClick}
          variant={variant}
          title={variant === 'search' ? 'Clear' : ''}
        >
          <Icon svg={ClearIcon} />
        </StyledInputButton>
      )}
    </StyledInputMainWrapper>
  )
}

export { Input }
