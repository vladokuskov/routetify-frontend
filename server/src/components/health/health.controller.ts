import { Request, Response } from 'express'
import httpStatus from 'http-status'

const getHealth = async (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    responsetime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  }
  try {
    res.status(httpStatus.OK).json(healthcheck)
  } catch (error) {
    if (error instanceof Error) {
      healthcheck.message = error.message

      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      res.json({ message: 'Internal server error' })
    }
  }
}

export { getHealth }
