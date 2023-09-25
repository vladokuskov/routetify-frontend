'use client'

import { useAppDispatch } from '@/redux/hooks'
import { Button } from '@/components/ui/button'
import { deleteUser, toggleUserSidebar } from '@/redux/features/userSlice'
import Icon from '@/components/ui/icon'
import XIcon from '@/assets/icons/x.svg'
import { logout } from '@/lib/api/user'
import { User } from '@/types/global/user.types'
import clsx from 'clsx'

const UserSidebar = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch()

  const handleSidebarClose = () => {
    dispatch(toggleUserSidebar(false))
  }

  const handleLogOut = async () => {
    await logout()

    dispatch(deleteUser())
    dispatch(toggleUserSidebar(false))
  }

  return (
    <aside
      className={clsx(
        'absolute bg-background border-foreground z-30 overflow-y-visible no-scrollbar w-full max-w-sidebar min-w-sidebar right-0 top-0 mt-0 h-[100lvh] border-l-2 max-sm:shadow p-4',
        'max-sm:fixed max-sm:max-w-[25rem] max-sm:top-[10rem] max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 max-sm:mt-[10rem] max-sm:border-2 max-sm:h-auto max-sm:rounded-md',
        'flex flex-col gap-4 items-center justify-start',
      )}
    >
      <header className="w-full flex items-center justify-between border-b border-neutral-300 dark:border-neutral-700 pb-4">
        <div className="font-roboto">
          <h2 className="text-title font-semibold">Hello, {user.username}</h2>
          <p className="text-sm text-muted-foreground ">{user.email}</p>
        </div>
        <Button
          variant="ghost"
          onClick={handleSidebarClose}
          size="sm"
          aria-label="Close sidebar"
        >
          <Icon svg={XIcon} size={17} />
        </Button>
      </header>

      {/* Add user routes section */}

      <Button
        variant="destructive"
        onClick={handleLogOut}
        aria-label="Log out"
        className="mt-auto"
      >
        Log out
      </Button>
    </aside>
  )
}

export { UserSidebar }
