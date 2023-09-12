import { Request, Response } from 'express'
import httpStatus from 'http-status'
import ServerError from '@core/instances/ServerError'
import { verify } from './route.service'

const verifyRoute = async (req: Request, res: Response) => {
  try {
    const { file } = req.body

    console.log(file)

    const result = await verify(file)

    if (result) {
      res.status(httpStatus.OK)
    } else {
      res.status(httpStatus.NOT_ACCEPTABLE)
    }
  } catch (error) {
    if (error instanceof ServerError) {
      res.status(error.code || 500)
      res.send({ error: error.message })
    }
  }
}

export { verifyRoute }
