import { updateDrawInfo } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { calculateRouteDetails } from '@/utils/getRouteDetails'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Detail } from '@/components/Sidebar/SidebarSections/Details/Detail/Detail'
import { getElevation } from '@/lib/api/elevation'

const Details = () => {
  const [maxElevation, setMaxElevation] = useState<string | null>(null)
  const [minElevation, setMinElevation] = useState<string | null>(null)

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const { time, dist } = useAppSelector((state) => state.drawReducer.drawInfo)
  const movingPreference = useAppSelector(
    (state) => state.controlsReducer.movingPreference,
  )

  const dispatch = useAppDispatch()

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

  useEffect(() => {
    if (drawCoords.length !== 0) {
      updateDetails()
    }
  }, [drawCoords, movingPreference])

  const getElevationData = async () => {
    const data = await getElevation(drawCoords)

    if (data) {
      setMaxElevation(data.maxElevation)
      setMinElevation(data.minElevation)
    }
  }

  useEffect(() => {
    if (drawCoords.length) {
      getElevationData()
    } else {
      setMaxElevation(null)
      setMinElevation(null)
    }
  }, [drawCoords])

  return (
    <div
      className={clsx(
        'w-full flex items-center flex-row justify-center bg-details rounded-md px-1 py-2',
        'max-sm:flex-row max-sm:max-w-full',
        !isSidebarOpen && 'flex-col',
      )}
    >
      <Detail title={time} subTitle="TIME" metric="h" />
      <Detail title={dist} subTitle="DIST" metric="km" />
      <Detail
        title={maxElevation ? maxElevation : '0'}
        subTitle="MAX"
        metric="m"
      />
      <Detail
        title={minElevation ? minElevation : '0'}
        subTitle="MIN"
        metric="m"
        last
      />
    </div>
  )
}

export { Details }
