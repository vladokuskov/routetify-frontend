import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import { MovingPreferencesButton } from './MovingPreferencesButton'
import { changeMovingPreferences } from '@/redux/features/controlsSlice'
import { movingPreferencesType } from '@/types/global/movingPreferencesType.types'

const MovingPreferences = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const selectedPreference = useAppSelector(
    (state) => state.controlsReducer.movingPreference,
  )
  const dispatch = useAppDispatch()

  const { walk, bike, car } = movingPreferencesType

  const preferences = [walk, bike, car]

  const handlePreferenceChange = (preference: movingPreferencesType) => {
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
  }

  return (
    <>
      <div
        className={clsx(
          'flex items-center justify-center gap-2',
          'max-sm:!flex',
          !isSidebarOpen && 'hidden',
        )}
      >
        {preferences.map((preference, index) => {
          return (
            <MovingPreferencesButton
              key={index}
              title={
                preference === walk
                  ? 'walk'
                  : preference === bike
                  ? 'bike'
                  : 'car'
              }
              handlePreferenceChange={() => handlePreferenceChange(preference)}
              selectedPreference={selectedPreference}
              preference={preference}
            >
              <span>
                {preference === walk
                  ? 'Walk'
                  : preference === bike
                  ? 'Bike'
                  : 'Car'}
              </span>
            </MovingPreferencesButton>
          )
        })}
      </div>
      <div
        className={clsx(
          'flex items-center justify-center gap-2',
          'max-sm:!hidden',
          isSidebarOpen && 'hidden',
        )}
      >
        <button title="Change preference" onClick={handleNextPreference}>
          <span></span>
          <span>
            {selectedPreference === walk
              ? 'Walk'
              : selectedPreference === bike
              ? 'bike'
              : 'car'}
          </span>
        </button>
      </div>
    </>
  )
}

export { MovingPreferences }
