import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'

const getHealth = async (req: Request, res: Response) => {
  const healthCheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  }
  try {
    res.status(OK).json(healthCheck)
  } catch (error) {
    if (error instanceof Error) {
      healthCheck.message = error.message

      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' })
    }
  }
}

export { getHealth }
