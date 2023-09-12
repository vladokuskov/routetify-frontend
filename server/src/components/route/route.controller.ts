import { Request, Response } from 'express'
import httpStatus from 'http-status'
import ServerError from '@core/instances/ServerError'
import { parse } from './route.service'

//TODO Handle file read from client

const parseRoute = async (req: Request, res: Response) => {
  try {
    res.status(httpStatus.OK)
    res.send([])
  } catch (error) {
    if (error instanceof ServerError) {
      res.status(error.code || 500)
      res.send({ error: error.message })
    }
  }
}

export { parseRoute }
