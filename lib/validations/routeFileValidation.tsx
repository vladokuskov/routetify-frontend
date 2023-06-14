import { parseString } from 'xml2js'

export const getFileExtension = async (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase()

  return extension
}

export const checkFileExtension = async (
  fileName: string,
): Promise<boolean> => {
  const extension = await getFileExtension(fileName)
  return new Promise<boolean>((resolve, reject) => {
    if (extension === 'gpx' || extension === 'kml') {
      resolve(true)
    } else {
      reject(new Error('Invalid file type.'))
    }
  })
}

export const validateFileStructure = async (file: File): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = (e.target as FileReader).result

      if (typeof content === 'string' && content.trim() !== '') {
        parseString(content, (err, result) => {
          if (err) {
            reject(new Error('Invalid file structure.'))
          } else {
            resolve(true)
          }
        })
      } else {
        reject(new Error('Empty file.'))
      }
    }

    reader.onerror = (e: ProgressEvent<FileReader>) => {
      reject(new Error('Failed to read file, choose another.'))
    }

    reader.readAsText(file)
  })
}
