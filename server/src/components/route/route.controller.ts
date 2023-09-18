import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { parse } from './route.service'
import { Extension } from 'types/extensions.types'

const parseRoute = async (req: Request, res: Response) => {
  try {
    const {
      file,
      extension,
    }: { file: Express.Multer.File; extension: Extension } = req.body

    const result = await parse(file, extension)

    if (result) {
      res.status(httpStatus.OK)
      res.json({ coords: result })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      res.json({ message: 'Internal server error' })
    }
  }
}

export { parseRoute }
