const getTokenFromCookie = (cookie: any) => {
  const cookieProperties = cookie.split('; ')

  for (const prop of cookieProperties) {
    const [key, value] = prop.split('=')
    if (key === 'token') {
      return value
    }
  }

  return null
}

export { getTokenFromCookie }
