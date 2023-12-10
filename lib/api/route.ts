import { Envs } from '@/config'
import { ZodError } from 'zod'
import axios from 'axios'
import { routeSchema } from '../validation/routeSchema'

const getRoute = async (file: File) => {
  try {
    const body = new FormData()
    body.append('file', file)

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds the maximum allowed size. (5 mb)')
    }

    const response = await axios.post(`${Envs.ORIGIN}/route/parse`, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    const { data } = response

    const parsedData = routeSchema.parse(data)

    return data.coords
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.message)
    } else if (err instanceof ZodError) {
      throw new Error(
        'Something happen on our side when parsing a file. Try again later.',
      )
    } else {
      throw new Error(
        'Something happen on our side when parsing a file. Try again later.',
      )
    }
  }
}

export { getRoute }
