import { DrawCoords } from '../models/drawCoords.types'

export type Route = {
  id: number
  name: string
  description: string
  route: DrawCoords[]
}
