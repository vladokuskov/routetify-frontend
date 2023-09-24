'use client'

import { Map } from '@/components/Map/Map'
import { FilesDragAndDrop } from '@/components/FilesDragAndDrop/FilesDragAndDrop'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { UserSidebar } from '@/components/UserSidebar/UserSidebar'
import { useAppSelector } from '@/redux/hooks'

export default function Editor() {
  const user = useAppSelector((state) => state.userReducer.user)
  const isUserSidebarOpen = useAppSelector(
    (state) => state.userReducer.isUserSidebarOpen,
  )

  return (
    <main className="bg-background w-full h-full max-h-full flex items-start justify-start">
      <Sidebar />
      <Map />
      <FilesDragAndDrop />
      {user && isUserSidebarOpen && <UserSidebar user={user} />}
    </main>
  )
}
