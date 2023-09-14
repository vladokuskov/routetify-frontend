import { changeMovingPreferences } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { MovingPreferencesType } from '@/types/global/movingPreferencesType.types'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { MovingPreferencesButton } from '@/components/Sidebar/SidebarSections/MovingPreferences/MovingPreferencesButton'

const MovingPreferences = () => {
  const [isArrowAnimated, setIsArrowAnimated] = useState(false)

  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const selectedPreference = useAppSelector(
    (state) => state.controlsReducer.movingPreference,
  )
  const dispatch = useAppDispatch()

  const { walk, bike, car } = MovingPreferencesType

  const preferences = [walk, bike, car]

  const handlePreferenceChange = (preference: MovingPreferencesType) => {
    dispatch(changeMovingPreferences(preference))
  }

  const handleNextPreference = () => {
    if (selectedPreference === walk) {
      dispatch(changeMovingPreferences(bike))
    } else if (selectedPreference === bike) {
      dispatch(changeMovingPreferences(car))
    } else if (selectedPreference === car) {
      dispatch(changeMovingPreferences(walk))
    }

    setIsArrowAnimated(true)
    setTimeout(() => {
      setIsArrowAnimated(false)
    }, 200)
  }

  useEffect(() => {
    const preference = localStorage.getItem('movingPreference')

    if (preference) {
      const parsedPreference = JSON.parse(preference) as MovingPreferencesType

      dispatch(changeMovingPreferences(parsedPreference))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('movingPreference', JSON.stringify(selectedPreference))
  }, [selectedPreference])

  return (
    <>
      {/*Full sidebar */}
      <div
        className={clsx(
          'flex items-center justify-center gap-2',
          !isSidebarOpen && 'hidden',
          'max-sm:!flex',
        )}
      >
        {preferences.map((preference, index) => {
          return (
            <MovingPreferencesButton
              variant="default"
              key={index}
              onClick={() => handlePreferenceChange(preference)}
              selectedPreference={selectedPreference}
              preference={preference}
            />
          )
        })}
      </div>

      {/*Compact sidebar */}
      {!isSidebarOpen && (
        <div
          className={clsx(
            'flex items-center justify-center gap-2 w-full',
            'max-sm:!hidden',
          )}
        >
          <MovingPreferencesButton
            variant="compact"
            onClick={handleNextPreference}
            selectedPreference={selectedPreference}
            isArrow={isArrowAnimated}
          />
        </div>
      )}
    </>
  )
}

export { MovingPreferences }
