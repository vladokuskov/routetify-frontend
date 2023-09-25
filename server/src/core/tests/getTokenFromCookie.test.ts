import { getTokenFromCookie } from 'core/utils/getTokenFromCookie' // Replace 'your-module' with the actual module path

describe('getTokenFromCookie', () => {
  it('should return null for an empty cookie', () => {
    const cookie = ''
    const token = getTokenFromCookie(cookie)
    expect(token).toBeNull()
  })

  it('should return null if the token is not found in the cookie', () => {
    const cookie = 'name=value; other=example'
    const token = getTokenFromCookie(cookie)
    expect(token).toBeNull()
  })

  it('should return the token value if "token" key is found in the cookie', () => {
    const cookie = 'name=value; token=myToken; other=example'
    const token = getTokenFromCookie(cookie)
    expect(token).toBe('myToken')
  })

  it('should not handle multiple spaces between cookie properties', () => {
    const cookie = 'name=value;     token=myToken;   other=example'
    const token = getTokenFromCookie(cookie)
    expect(token).toBeNull()
  })

  it('should handle not different capitalizations of "token"', () => {
    const cookie = 'name=value; Token=myToken; other=example'
    const token = getTokenFromCookie(cookie)
    expect(token).toBeNull()
  })
})
