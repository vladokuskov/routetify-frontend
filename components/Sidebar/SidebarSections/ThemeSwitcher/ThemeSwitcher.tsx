import Icon from '@/components/Icon/Icon'
import SunIcon from '../../../../assets/icons/sun.svg'
import MoonIcon from '../../../../assets/icons/moon-filled.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Theme } from '@/types/global/theme.types'
import { changeTheme } from '@/redux/features/controlsSlice'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

const ThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const currentTheme = useAppSelector((state) => state.controlsReducer.theme)

  const dispatch = useAppDispatch()

  const { theme, systemTheme, setTheme } = useTheme()

  const handleThemeChange = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'

    dispatch(changeTheme(newTheme === 'dark' ? Theme.Dark : Theme.Light))
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      dispatch(changeTheme(savedTheme === 'light' ? Theme.Light : Theme.Dark))
      setTheme(savedTheme)
    }
  }, [])

  return isMounted ? (
    <button
      className={clsx(
        'hocus:bg-neutral-200 text-neutral-600 hocus:text-neutral-800 p-3 rounded-md',
        'dark:hocus:bg-neutral-600 dark:text-neutral-400 dark:hocus:text-neutral-200',
      )}
      onClick={handleThemeChange}
      title="Change theme"
    >
      <Icon svg={currentTheme === Theme.Light ? SunIcon : MoonIcon} />
    </button>
  ) : (
    <></>
  )
}

export { ThemeSwitcher }
