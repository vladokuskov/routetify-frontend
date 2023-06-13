export const getFileExtension = async (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()
  return extension
}

export const isGPXFileType = async (fileName: string): Promise<boolean> => {
  const extension = await getFileExtension(fileName)
  return new Promise<boolean>((resolve) => {
    if (extension === 'gpx') {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

export const isKMLFileType = async (fileName: string): Promise<boolean> => {
  const extension = await getFileExtension(fileName)
  return new Promise<boolean>((resolve) => {
    if (extension === 'kml') {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

export const validateFileStructure = async (file: File): Promise<boolean> => {
  try {
    const reader = new FileReader() // Create a new FileReader object
    const fileContent = await new Promise<string>((resolve, reject) => {
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const content = event.target?.result as string // Access the file content
        resolve(content)
      }
      reader.onerror = (event: ProgressEvent<FileReader>) => {
        reject(new Error('Failed to validate file, choose another.'))
      }
      reader.readAsText(file) // Read the file as text
    })

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(fileContent, 'application/xml')
      if (doc) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  } catch (error) {
    return false
  }
}
