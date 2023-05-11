import { IBoolean } from '@/types/global/index.types'

type ButtonVariants = 'primary' | 'icon' | 'outlined'

type ButtonStatus = 'default' | 'success' | 'danger'

type ButtonSizes =
  | 'sm1'
  | 'sm2'
  | 'sm3'
  | 'md1'
  | 'md2'
  | 'md3'
  | 'xl1'
  | 'xl2'
  | 'xl3'

export type Button = {
  variant?: ButtonVariants
  text?: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | null
  full?: IBoolean
  size?: ButtonSizes
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  isDisabled?: IBoolean
  status?: ButtonStatus
  loading?: IBoolean
}
