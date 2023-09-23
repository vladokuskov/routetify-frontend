import { describe } from '@jest/globals'
import ServerError from 'core/instances/ServerError'
import { validateEmail, validatePassword } from 'core/utils/validation'
import { CONFLICT } from 'http-status'

describe('Validate password (1)', () => {
  it('Should return successful validation', async () => {
    const result = await validatePassword('123456mI')

    expect(result).toBe(true)
  })
})

describe('Validate password (2)', () => {
  it('Should return failed validation', () => {
    const cases = ['123456m8', '', '1', 'kkkkkkkk', '11111111']

    cases.forEach(async (el: string) => {
      try {
        await validatePassword(el)
      } catch (error) {
        if (error instanceof ServerError) {
          expect(error.message).toBe('Provide correct password')
          expect(error.status).toBe(CONFLICT)
        }
      }
    })
  })
})

describe('Validate email (1)', () => {
  it('Should return successful validation', async () => {
    const result = await validateEmail('t@g.cm')

    expect(result).toBe(true)
  })
})

describe('Validate email (2)', () => {
  it('Should return failed validation', () => {
    const cases = ['', '@', 'c@', '@.', 'c@.c', '@.c', 'c.cm']

    cases.forEach(async (el: string) => {
      try {
        await validateEmail(el)
      } catch (error) {
        if (error instanceof ServerError) {
          expect(error.message).toBe('Provide correct email')
          expect(error.status).toBe(CONFLICT)
        }
      }
    })
  })
})
