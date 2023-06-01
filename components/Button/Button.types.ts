import { IBoolean } from '@/types/global/index.types'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariants = 'primary' | 'map' | 'outlined'

type ButtonStatus = 'default' | 'success' | 'danger'

type ButtonSizes = 'small' | 'regular' | 'large'

export interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  full?: IBoolean
  size?: ButtonSizes
  className?: string
  status?: ButtonStatus
  children: ReactNode
}
