type InputVariants = 'search';

type FieldTypes = 'text' | 'email' | 'password' | 'number';

export type TInput = {
  variant?: InputVariants;
  label?: string;
  value?: string;
  required?: boolean;
  fieldType?: FieldTypes;
  isPassShowed?: boolean;
  icon?: any;
  full?: 'true' | 'false';
  placeholder?: string;
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: 'true' | 'false';
};
