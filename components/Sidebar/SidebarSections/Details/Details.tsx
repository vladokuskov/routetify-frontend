import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Detail } from './Detail/Detail'
import { StyledDetailsMainContainer } from './Details.styles'
import { calculateRouteDetails } from '@/utils/getRouteDetails'
import { updateDrawInfo } from '@/redux/features/drawSlice'
import { useEffect } from 'react'

const Details = () => {
  const exportCoords = useAppSelector((state) => state.drawReducer.exportCoords)
  const { time, dist } = useAppSelector((state) => state.drawReducer.drawInfo)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const updateDetails = () => {
      const { time, distance } = calculateRouteDetails(exportCoords)

      dispatch(
        updateDrawInfo({
          time: time.toFixed(2).toString(),
          dist: distance.toFixed(2).toString(),
        }),
      )

      if (exportCoords.length === 0) {
        dispatch(
          updateDrawInfo({
            time: '0',
            dist: '0',
          }),
        )
      }
    }

    if (exportCoords.length !== 0) {
      updateDetails()
    }
  }, [exportCoords])

  return (
    <StyledDetailsMainContainer>
      <Detail title={time} subTitle="Time, h" />
      <Detail title={dist} subTitle="Dist, km" />
    </StyledDetailsMainContainer>
  )
}

export { Details }
