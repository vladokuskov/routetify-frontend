import ArrowRightIcon from '@/assets/icons/arrow-right.svg'
import BikeIcon from '@/assets/icons/bike.svg'
import CarIcon from '@/assets/icons/car.svg'
import WalkIcon from '@/assets/icons/walk.svg'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { changeMovingPreferences } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { MovingPreferencesType } from '@/types/global/movingPreferencesType.types'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

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
            <Button
              variant="default"
              className="flex-col p-2 h-18 min-w-[4rem] bg-primary-muted disabled:bg-primary disabled:opacity-100"
              disabled={selectedPreference === preference}
              key={index}
              onClick={() => handlePreferenceChange(preference)}
              aria-label={
                preference === walk
                  ? 'Walk moving preference'
                  : preference === bike
                  ? 'Bike moving preference'
                  : 'Car moving preference'
              }
              title={
                preference === walk
                  ? 'Walk'
                  : preference === bike
                  ? 'Bike'
                  : 'Car'
              }
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
              <span className="text-sm">
                {preference === walk
                  ? 'Walk'
                  : preference === bike
                  ? 'Bike'
                  : 'Car'}
              </span>
            </Button>
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
          <Button
            variant="default"
            className="flex-col justify-start relative px-1 py-2 h-22 pb-8 w-full "
            onClick={handleNextPreference}
            aria-label={
              selectedPreference === walk
                ? 'Walk moving preference'
                : selectedPreference === bike
                ? 'Bike moving preference'
                : 'Car moving preference'
            }
            title={
              selectedPreference === walk
                ? 'Walk'
                : selectedPreference === bike
                ? 'Bike'
                : 'Car'
            }
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
                isArrowAnimated && 'animate-move-right',
              )}
            />
          </Button>
        </div>
      )}
    </>
  )
}

export { MovingPreferences }
