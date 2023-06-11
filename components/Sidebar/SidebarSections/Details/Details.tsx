import { updateDrawInfo } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { calculateRouteDetails } from '@/utils/getRouteDetails'
import clsx from 'clsx'
import { useEffect } from 'react'
import { Detail } from './Detail/Detail'

const Details = () => {
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const { time, dist } = useAppSelector((state) => state.drawReducer.drawInfo)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const updateDetails = () => {
      const { time, distance } = calculateRouteDetails(drawCoords)

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
  }, [drawCoords])

  return (
    <div
      className={clsx(
        'w-full flex items-center flex-row justify-center gap-1 bg-details rounded-md px-1 py-2',
        'max-sm:flex-row max-sm:max-w-full',
        !isSidebarOpen && 'flex-col',
      )}
    >
      <Detail title={time} subTitle="TIME" description="h" />
      <hr
        className={clsx(
          'h-full w-auto rounded-md border border-black border-opacity-20',
          !isSidebarOpen && 'h-auto !w-full max-sm:!w-auto',
        )}
      />
      <Detail title={dist} subTitle="DIST" description="km" />
    </div>
  )
}

export { Details }
