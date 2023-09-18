import { z } from 'zod'

const routeSchema = z.object({
  coords: z.array(
    z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  ),
})

export { routeSchema }
