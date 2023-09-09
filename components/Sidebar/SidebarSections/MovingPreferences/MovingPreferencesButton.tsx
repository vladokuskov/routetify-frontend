import Icon from '@/components/Icon/Icon'
import { MovingPreferencesType } from '@/types/global/movingPreferencesType.types'
import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'
import BikeIcon from '@/assets/icons/bike.svg'
import CarIcon from '@/assets/icons/car.svg'
import WalkIcon from '@/assets/icons/walk.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'

interface MovingPreferencesButton
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'default' | 'compact'
  selectedPreference: MovingPreferencesType
  preference?: MovingPreferencesType
  isArrow?: boolean
}

const MovingPreferencesButton = ({
  variant = 'default',
  selectedPreference,
  preference,
  isArrow = false,
  ...props
}: MovingPreferencesButton) => {
  const { walk, bike, car } = MovingPreferencesType
  return (
    <>
      {variant === 'default' && (
        <button
          disabled={selectedPreference === preference}
          aria-label={
            preference === walk
              ? 'Walk moving preference'
              : preference === bike
              ? 'Bike moving preference'
              : 'Car moving preference'
          }
          title={
            preference === walk ? 'Walk' : preference === bike ? 'Bike' : 'Car'
          }
          className={clsx(
            'flex flex-col items-center justify-center gap-1 p-2 h-18 min-w-[4rem] bg-lime-200 text-neutral-800 border-2 border-transparent font-roboto rounded-md font-semibold transition-colors',
            'disabled:border-lime-400 disabled:bg-lime-300',
            'hocus:bg-lime-300 hocus:!text-neutral-950',
          )}
          {...props}
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
        </button>
      )}
      {variant === 'compact' && (
        <button
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
          className={clsx(
            ' bg-lime-300 px-1 py-2 h-22 w-full rounded-md transition-colors text-neutral-800 relative pb-7 flex flex-col items-center justify-center',
            'hocus:bg-lime-200 hocus:text-neutral-950',
          )}
          {...props}
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
              isArrow && 'animate-moveRight',
            )}
          />
        </button>
      )}
    </>
  )
}

export { MovingPreferencesButton }
