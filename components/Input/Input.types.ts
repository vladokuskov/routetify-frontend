import { IBoolean } from '@/types/global/index.types'
import { InputHTMLAttributes, ReactNode } from 'react'

type inputVariant = 'search'

export interface Input extends InputHTMLAttributes<HTMLInputElement> {
  variant: inputVariant
  className?: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  loading?: IBoolean
}
