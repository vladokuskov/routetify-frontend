import { IBoolean } from '@/types/global/index.types'

export type Icon = {
  svg: React.FC<React.SVGProps<SVGSVGElement>>
  width?: string
  height?: string
  className?: string
  spin?: IBoolean
}
