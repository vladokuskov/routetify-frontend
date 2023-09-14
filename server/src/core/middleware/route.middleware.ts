import ServerError from 'core/instances/ServerError'
import { getFileExtension } from 'core/utils/getFileExtension'
import { verifyFileStructure } from 'core/utils/verifyFileStructure'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import multer from 'multer'

const verifyFileRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const upload = multer({
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB in bytes
      },
    }).single('file')

    upload(req, res, async (err) => {
      if (err || !req.file) {
        res.status(httpStatus.EXPECTATION_FAILED)
        res.json({
          error:
            err.message ||
            'Provide request with correct fields in form. ("file": content)',
        })
      } else {
        try {
          const file = req.file
          const name = file.originalname

          const extension = await getFileExtension(name)

          await verifyFileStructure(file, extension)

          // All checks passed
          req.body = { file, extension }

          next()
        } catch (error) {
          if (error instanceof ServerError) {
            res.status(error.code || httpStatus.INTERNAL_SERVER_ERROR)
            res.json({ error: error.message || 'Internal server error' })
          } else {
            console.log(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR)
            res.json({ error: 'Internal server error' })
          }
        }
      }
    })
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
    res.json({ error: 'Internal server error' })
  }
}

export { verifyFileRequest }
