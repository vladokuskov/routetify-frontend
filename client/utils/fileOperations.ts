const verifyFile = async (file: File) => {
  try {
    const body = new FormData()
    body.append('file', file)

    const response = await fetch('/route/verify', {
      method: 'GET',
      body,
    })

    if (!response.ok) {
      throw new Error('Invalid file format.')
    }

    return true
  } catch (err: any) {
    throw new Error('Invalid file format.')
  }
}

const parseFile = async (file: File) => {
  try {
    const body = new FormData()
    body.append('file', file)

    const response = await fetch('/route/parse', {
      method: 'GET',
      body,
    })

    if (!response.ok) {
      throw new Error('Something happen when parsing your file.')
    }

    return []
  } catch (err) {
    throw new Error('Something happen when parsing your file.')
  }
}

export { verifyFile, parseFile }
