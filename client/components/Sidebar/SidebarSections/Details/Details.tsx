import { useAppSelector } from '@/redux/hooks'
import { calculateRouteDetails } from '@/utils/getRouteDetails'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Detail } from '@/components/Sidebar/SidebarSections/Details/Detail/Detail'
import { getElevation } from '@/lib/api/elevation'

interface DetailsState {
  time: string | null
  dist: string | null
  maxElevation: string | null
  minElevation: string | null
}

const Details = () => {
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )
  const movingPreference = useAppSelector(
    (state) => state.controlsReducer.movingPreference,
  )

  const [details, setDetails] = useState<DetailsState>({
    time: null,
    dist: null,
    maxElevation: null,
    minElevation: null,
  })

  const updateDetails = () => {
    if (drawCoords.length === 0) {
      setDetails({
        time: null,
        dist: null,
        maxElevation: null,
        minElevation: null,
      })
    } else {
      const { time, distance } = calculateRouteDetails(
        drawCoords,
        movingPreference,
      )
      setDetails((prev) => {
        return {
          ...prev,
          time: time.toFixed(2).toString(),
          dist: distance.toFixed(2).toString(),
        }
      })
    }
  }

  const getElevationData = async () => {
    if (drawCoords.length) {
      const data = await getElevation(drawCoords)
      if (data) {
        setDetails((prev) => {
          return {
            ...prev,
            maxElevation: data.maxElevation,
            minElevation: data.minElevation,
          }
        })
      }
    }
  }

  useEffect(() => {
    updateDetails()
    getElevationData()
  }, [drawCoords])

  return (
    <div
      className={clsx(
        'w-full flex items-center flex-row justify-center bg-details rounded-md px-1 py-2',
        'max-sm:flex-row max-sm:max-w-full',
        !isSidebarOpen && 'flex-col',
      )}
    >
      <Detail
        title={details.time ? details.time : '0'}
        subTitle="TIME"
        metric="h"
      />
      <Detail
        title={details.dist ? details.dist : '0'}
        subTitle="DIST"
        metric="km"
      />
      <Detail
        title={details.maxElevation ? details.maxElevation : '0'}
        subTitle="MAX"
        metric="m"
      />
      <Detail
        title={details.minElevation ? details.minElevation : '0'}
        subTitle="MIN"
        metric="m"
        last
      />
    </div>
  )
}

export { Details }
