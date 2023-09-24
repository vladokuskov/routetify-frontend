'use client'

import { useAppDispatch } from '@/redux/hooks'
import { Button } from '@/components/ui/button'
import { deleteUser, toggleUserSidebar } from '@/redux/features/userSlice'
import Icon from '@/components/ui/icon'
import XIcon from '@/assets/icons/x.svg'
import { logout } from '@/lib/api/user'
import { User } from '@/types/global/user.types'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

const UserSidebar = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch()

  const handleSidebarClose = () => {
    dispatch(toggleUserSidebar(false))
  }

  const handleLogOut = async () => {
    const isLoggedOut = await logout()

    if (isLoggedOut) {
      // Remove user from state
      dispatch(deleteUser())

      // Close sidebar
      dispatch(toggleUserSidebar(false))
    }
  }

  // useEffect(() => {
  //   dispatch(toggleUserSidebar(false))
  // }, [pathname])

  return (
    <aside
      className={clsx(
        'absolute bg-background border-foreground z-30 overflow-y-visible no-scrollbar max-w-sidebar min-w-sidebar right-0 top-0 mt-0 h-[100lvh] border-l-2 max-sm:shadow',
        'max-sm:top-20 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 max-sm:p-4 max-sm:mt-[10rem]  max-sm:border-2 max-sm:h-auto max-sm:rounded-md',
      )}
    >
      Sidebar
      <Button
        variant="ghost"
        onClick={handleSidebarClose}
        size="sm"
        aria-label="Close sidebar"
      >
        <Icon svg={XIcon} size={17} />
      </Button>
      <p>{user.email}</p>
      <p>{user.id}</p>
      <p>{user.username}</p>
      <Button onClick={handleLogOut} aria-label="Log out">
        Log out
      </Button>
    </aside>
  )
}

export { UserSidebar }
