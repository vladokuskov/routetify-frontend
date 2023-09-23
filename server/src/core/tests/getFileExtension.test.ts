import { describe } from '@jest/globals'
import { getFileExtension } from 'core/utils/getFileExtension'
import config from 'config/index'

describe('Get allowed file extension', () => {
  it('Should return allowed extension', () => {
    const extensions = config.allowedExtensions
    extensions.forEach(async (ext) => {
      const result = await getFileExtension(`test.${ext}`)

      expect(result).toBe(ext)
    })
  })
})

describe('Get not allowed file extension (1)', () => {
  it('Should return error about wrong extension', async () => {
    try {
      await getFileExtension(`test.ext`)
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).toBe('Provide a file with a correct extension')
    }
  })
})

describe('Get not allowed file extension (2)', () => {
  it('Should return error about double extension', async () => {
    try {
      await getFileExtension(`test.ext.ext`)
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).toBe('Provide a file with a single extension')
    }
  })
})
