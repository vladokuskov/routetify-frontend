import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariants = 'map' | 'routeType' | 'tile'

type ButtonStatus = 'default' | 'success' | 'danger'

type ButtonSizes = 'small' | 'regular' | 'large'

export interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
  size?: ButtonSizes
  className?: string
  status?: ButtonStatus
  children: ReactNode
}
