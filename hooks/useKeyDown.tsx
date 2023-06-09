import { useEffect } from 'react'

export const useKeyDown = (callback: () => void, keys: string[]) => {
  const onKeyDown = (event: KeyboardEvent) => {
    const isInputElement =
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    if (isInputElement) {
      return
    }

    const wasAnyKeyPressed = keys.some((key) => event.code === key)
    if (wasAnyKeyPressed) {
      event.preventDefault()
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown]) // Note: I removed [onKeyDown] dependency, as it's not necessary in this case.
}
