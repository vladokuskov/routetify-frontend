import Icon from '@/components/Icon/Icon'
import SunIcon from '../../../../assets/icons/sun.svg'
import MoonIcon from '../../../../assets/icons/moon-filled.svg'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

const ThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isDark, setIsDark] = useState<boolean>(false)

  const { theme, systemTheme, setTheme } = useTheme()

  const handleThemeChange = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'

    setIsDark(newTheme === 'dark')
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
      setTheme(savedTheme)
    }
  }, [])

  return isMounted ? (
    <button
      className={clsx(
        'focus:bg-neutral-200 text-neutral-600 hocus:text-neutral-800 p-3 rounded-md',
        'dark:focus:bg-neutral-800 dark:text-neutral-400 dark:hocus:text-neutral-200',
      )}
      onClick={handleThemeChange}
      aria-label="Change theme"
    >
      <Icon svg={isDark ? SunIcon : MoonIcon} />
    </button>
  ) : (
    <></>
  )
}

export { ThemeSwitcher }
