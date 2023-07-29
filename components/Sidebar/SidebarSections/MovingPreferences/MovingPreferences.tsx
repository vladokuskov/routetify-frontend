import Icon from '@/components/Icon/Icon'
import { changeMovingPreferences } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { MovingPreferencesType } from '@/types/global/movingPreferencesType.types'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import ArrowRightIcon from '../../../../assets/icons/arrow-right.svg'
import BikeIcon from '../../../../assets/icons/bike.svg'
import CarIcon from '../../../../assets/icons/car.svg'
import WalkIcon from '../../../../assets/icons/walk.svg'
import { MovingPreferencesButton } from './MovingPreferencesButton'

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
              aria-label={
                preference === walk
                  ? 'Walk'
                  : preference === bike
                  ? 'Bike'
                  : 'Car'
              }
              handlePreferenceChange={() => handlePreferenceChange(preference)}
              selectedPreference={selectedPreference}
              preference={preference}
            >
              <Icon
                svg={
                  preference === walk
                    ? WalkIcon
                    : preference === bike
                    ? BikeIcon
                    : CarIcon
                }
              />
              <span className=" text-neutral-700 text-sm">
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
          'flex items-center justify-center gap-2 w-full',
          'max-sm:!hidden',
          isSidebarOpen && 'hidden',
        )}
      >
        <button
          aria-label="Change preference"
          onClick={handleNextPreference}
          className={clsx(
            ' bg-lime-300 px-1 py-2 h-22 w-full rounded-md transition-colors text-neutral-700 relative pb-7 flex flex-col items-center justify-center',
            'hocus:bg-lime-200',
          )}
        >
          <span className=" flex flex-col justify-center items-center">
            <Icon
              svg={
                selectedPreference === walk
                  ? WalkIcon
                  : selectedPreference === bike
                  ? BikeIcon
                  : CarIcon
              }
            />
          </span>
          <span className="font-roboto font-semibold text-sm">
            {selectedPreference === walk
              ? 'Walk'
              : selectedPreference === bike
              ? 'Bike'
              : 'Car'}
          </span>
          <Icon
            svg={ArrowRightIcon}
            className={clsx(
              'absolute bottom-4 h-1',
              'transform transition-transform',
              isArrowAnimated && 'animate-moveRight',
            )}
          />
        </button>
      </div>
    </>
  )
}

export { MovingPreferences }
