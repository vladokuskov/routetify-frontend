'use client'

import { setupStore } from '@/redux/store'
import { Provider } from 'react-redux'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={setupStore()}>{children}</Provider>
}
