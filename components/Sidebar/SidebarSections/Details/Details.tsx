import { updateDrawInfo } from '@/redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { calculateRouteDetails } from '@/utils/getRouteDetails'
import { useEffect } from 'react'
import { Detail } from './Detail/Detail'
import {
  StyledDetailsMainContainer,
  StyledSeparationLine,
} from './Details.styles'

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
    <StyledDetailsMainContainer isSidebarOpen={isSidebarOpen}>
      <Detail title={time} subTitle="TIME" description="h" />
      <StyledSeparationLine isSidebarOpen={isSidebarOpen} />
      <Detail title={dist} subTitle="DIST" description="km" />
    </StyledDetailsMainContainer>
  )
}

export { Details }
