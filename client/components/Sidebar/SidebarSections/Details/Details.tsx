import { updateDrawInfo } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { calculateRouteDetails } from '@/utils/getRouteDetails'
import clsx from 'clsx'
import { useEffect } from 'react'
import { Detail } from '@/components/Sidebar/SidebarSections/Details/Detail/Detail'

type DetailVariants = 'time' | 'dist'

const Details = () => {
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const details = ['time', 'dist'] as DetailVariants[]
  const { time, dist } = useAppSelector((state) => state.drawReducer.drawInfo)
  const movingPreference = useAppSelector(
    (state) => state.controlsReducer.movingPreference,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    const updateDetails = () => {
      const { time, distance } = calculateRouteDetails(
        drawCoords,
        movingPreference,
      )

      dispatch(
        updateDrawInfo({
          time: time.toFixed(1).toString(),
          dist: distance.toFixed(1).toString(),
        }),
      )

      if (drawCoords.length === 0) {
        dispatch(
          updateDrawInfo({
            time: '0',
            dist: '0',
          }),
        )
      }
    }

    if (drawCoords.length !== 0) {
      updateDetails()
    }
  }, [drawCoords, movingPreference])

  return (
    <div
      className={clsx(
        'w-full flex items-center flex-row justify-center bg-details rounded-md px-1 py-2',
        'max-sm:flex-row max-sm:max-w-full',
        !isSidebarOpen && 'flex-col',
      )}
    >
      {details.map((variant, index) => {
        return (
          <Detail
            key={index}
            title={variant === 'time' ? time : variant === 'dist' ? dist : null}
            subTitle={
              variant === 'time' ? 'TIME' : variant === 'dist' ? 'DIST' : null
            }
            metric={variant === 'time' ? 'h' : variant === 'dist' ? 'km' : null}
            last={index === details.length - 1}
          />
        )
      })}
    </div>
  )
}

export { Details }
