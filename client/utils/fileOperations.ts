import { Envs } from '@/config'
import { DrawCoords } from '@/types/models/drawCoords.types'

const parseFile = async (file: File) => {
  try {
    const body = new FormData()
    body.append('file', file)

    const response = await fetch(`${Envs.ORIGIN}/route/parse`, {
      method: 'POST',
      body,
    })

    if (response.status === 405) {
      throw new Error('Services currently shut down.')
    }

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.error || 'Something happened when parsing your file.',
      )
    }

    const data: DrawCoords[] = await response.json()

    return data
  } catch (err) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new Error('Services currently shut down. Try again later.')
    } else {
      throw err
    }
  }
}

export { parseFile }
