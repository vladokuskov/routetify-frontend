'use client'

import Icon from '@/components/ui/icon'
import SunIcon from '@/assets/icons/sun.svg'
import MoonIcon from '@/assets/icons/moon-stars.svg'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const ThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isDark, setIsDark] = useState<boolean>(false)

  const router = useRouter()

  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    const themeMetaTag = document.querySelector('meta[name="theme-color"]')
    const currentTheme = theme

    const newTheme = currentTheme === 'light' ? 'dark' : 'light'

    const themeColor = newTheme === 'dark' ? '#0A0A0A' : '#F8F6F6'

    setIsDark(newTheme === 'dark')
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    if (themeMetaTag) {
      themeMetaTag.setAttribute('content', themeColor)
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      const themeMetaTag = document.querySelector('meta[name="theme-color"]')

      setIsDark(savedTheme === 'dark')
      setTheme(savedTheme)

      const themeColor = savedTheme === 'dark' ? '#0A0A0A' : '#F8F6F6'

      if (themeMetaTag) {
        themeMetaTag.setAttribute('content', themeColor)
      }
    }
  }, [])

  return isMounted ? (
    <Button
      variant="ghost"
      className="active:scale-90"
      size="cube"
      onClick={handleThemeChange}
      aria-label="Change theme"
    >
      <Icon svg={isDark ? SunIcon : MoonIcon} size={24} />
    </Button>
  ) : (
    <div className="bg-neutral-200 dark:bg-neutral-800 animate-pulse h-8 w-8 rounded-md" />
  )
}

export { ThemeSwitcher }
