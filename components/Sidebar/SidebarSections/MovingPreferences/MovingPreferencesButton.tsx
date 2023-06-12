import { movingPreferencesType } from '@/types/global/movingPreferencesType.types'
import { ReactNode } from 'react'

interface MovingPreferencesButton {
  selectedPreference: movingPreferencesType
  handlePreferenceChange: (preference: movingPreferencesType) => void
  preference: movingPreferencesType
  title: string
  children: ReactNode
}

const MovingPreferencesButton = ({
  selectedPreference,
  handlePreferenceChange,
  preference,
  title,
  children,
}: MovingPreferencesButton) => {
  return (
    <button
      title={title}
      onClick={() => handlePreferenceChange(preference)}
      disabled={selectedPreference === preference}
    >
      {children}
    </button>
  )
}

export { MovingPreferencesButton }
