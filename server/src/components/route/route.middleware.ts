import { getFileExtension } from 'core/utils/getFileExtension'
import { verifyFileStructure } from 'core/utils/verifyFileStructure'
import { NextFunction, Request, Response } from 'express'
import httpStatus, { INTERNAL_SERVER_ERROR, NOT_ACCEPTABLE } from 'http-status'
import multer from 'multer'

const verifyFileRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers['content-type']?.split(';')

  if (!header || header[0] !== 'multipart/form-data') {
    res.status(httpStatus.NOT_ACCEPTABLE).json({
      message: 'Provide request with a correct content type.',
    })

    return
  }

  try {
    const upload = multer({
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB in bytes
      },
    }).single('file')

    upload(req, res, async (err) => {
      if (err || !req.file) {
        res.status(httpStatus.EXPECTATION_FAILED).json({
          message:
            'Provide request with correct fields in form. ("file": content)',
        })
      } else {
        try {
          const file = req.file
          const name = file.originalname

          const extension = await getFileExtension(name)

          await verifyFileStructure(file, extension)

          req.body = { file, extension }

          next()
        } catch (error) {
          if (error instanceof Error) {
            res
              .status(NOT_ACCEPTABLE)
              .json({ message: error.message || 'Internal server error' })
          }
        }
      }
    })
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
  }
}

export { verifyFileRequest }
