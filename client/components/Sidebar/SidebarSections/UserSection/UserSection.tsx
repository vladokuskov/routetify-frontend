'use client'

import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { toggleUserSidebar, updateUser } from '@/redux/features/userSlice'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import UserIcon from '@/assets/icons/user.svg'
import LoginIcon from '@/assets/icons/login.svg'
import { getUser } from '@/lib/api/user'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { toggleIsSidebarOpen } from '@/redux/features/controlsSlice'

const UserSection = () => {
  const user = useAppSelector((state) => state.userReducer.user)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const isUserSidebarOpen = useAppSelector(
    (state) => state.userReducer.isUserSidebarOpen,
  )
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSidebarOpen = () => {
    if (!user) {
      router.push('/login')
    } else {
      dispatch(toggleUserSidebar(!isUserSidebarOpen))

      dispatch(toggleIsSidebarOpen(!isUserSidebarOpen))
    }
  }

  const getUserData = async () => {
    try {
      setIsUserLoading(true)
      const response = await getUser()

      if (response) {
        dispatch(updateUser(response))
        setIsUserLoading(false)
      } else {
        setIsUserLoading(false)
      }
    } catch (err) {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className="w-full h-16 flex items-center justify-end">
      {isUserLoading ? (
        <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-md" />
      ) : (
        <div className="w-full h-full">
          <Button
            variant="ghost"
            onClick={handleSidebarOpen}
            className="w-full h-full"
            aria-label={user ? 'Open profile sidebar' : 'Log in'}
          >
            <Icon svg={user ? UserIcon : LoginIcon} />

            <span
              className={clsx(
                'flex',
                'max-sm:!flex',
                !isSidebarOpen && 'hidden',
              )}
            >
              {user?.email}
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}

export { UserSection }
