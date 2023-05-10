import { IBoolean } from '@/types/global/index.types'

type InputVariants = 'search'

type FieldTypes = 'text' | 'email' | 'password' | 'number'

export type Input = {
  variant?: InputVariants
  label?: string
  value?: string
  fieldType?: FieldTypes
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  full?: IBoolean
  placeholder?: string
  name?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  loading?: IBoolean
}
