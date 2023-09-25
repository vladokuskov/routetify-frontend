import { getFileExtension } from 'core/utils/getFileExtension'
import config from 'config/index'

test.each(config.allowedExtensions.map((ext) => [ext, ext]))(
  'Get allowed file extension - %s',
  async (input, expected) => {
    const result = await getFileExtension(`test.${input}`)
    expect(result).toBe(expected)
  },
)

// Invalid Extensions
const invalidExtensions = [
  {
    input: 'test.ext',
    expectedErrorMessage: 'Provide a file with a correct extension',
  },
  {
    input: 'test.ext.ext',
    expectedErrorMessage: 'Provide a file with a single extension',
  },
]

test.each(invalidExtensions)(
  'Get not allowed file extension - %s',
  async ({ input, expectedErrorMessage }) => {
    try {
      await getFileExtension(input)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe(expectedErrorMessage)
      }
    }
  },
)
