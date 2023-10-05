import config from '@/config/index'
import { Extension } from '@/types/extensions.types'

const getFileExtension = async (filename: string) => {
  const parts = filename.split('.')
  if (parts.length !== 2) {
    throw new Error('Provide a file with a single extension')
  }

  const extension = parts[1].toLowerCase()
  if (!config.allowedExtensions.includes(extension as Extension)) {
    throw new Error('Provide a file with a correct extension')
  }

  return extension as Extension
}

export { getFileExtension }
