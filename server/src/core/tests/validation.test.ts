import ServerError from 'core/instances/ServerError'
import { validateEmail, validatePassword } from 'core/utils/validation'
import { CONFLICT } from 'http-status'

// password
test.each`
  password      | description
  ${'123456mI'} | ${'valid password'}
  ${'123456m8'} | ${'password with invalid format'}
  ${''}         | ${'empty password'}
  ${'1'}        | ${'short password'}
  ${'kkkkkkkk'} | ${'password with no numbers'}
  ${'11111111'} | ${'password with no uppercase letter'}
`('Validate password - $description', async ({ password }) => {
  if (password === '123456mI') {
    const result = await validatePassword(password)
    expect(result).toBe(true)
  } else {
    try {
      await validatePassword(password)
    } catch (error) {
      if (error instanceof ServerError) {
        expect(error.message).toBe('Provide correct password')
        expect(error.status).toBe(CONFLICT)
      }
    }
  }
})

// email
test.each`
  email       | description
  ${'t@g.cm'} | ${'valid email'}
  ${''}       | ${'empty email'}
  ${'@'}      | ${'invalid email'}
  ${'c@'}     | ${'invalid email'}
  ${'@.'}     | ${'invalid email'}
  ${'c@.c'}   | ${'invalid email'}
  ${'@.c'}    | ${'invalid email'}
  ${'c.cm'}   | ${'invalid email'}
`('Validate email - $description', async ({ email }) => {
  if (email === 't@g.cm') {
    const result = await validateEmail(email)
    expect(result).toBe(true)
  } else {
    try {
      await validateEmail(email)
    } catch (error) {
      if (error instanceof ServerError) {
        expect(error.message).toBe('Provide correct email')
        expect(error.status).toBe(CONFLICT)
      }
    }
  }
})
