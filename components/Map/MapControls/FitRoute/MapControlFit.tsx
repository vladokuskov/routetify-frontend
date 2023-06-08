import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import {
  changeFitBounds,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import FitIcon from '../../../../assets/icons/fit.svg'

const MapControlFitRoute = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const handleRouteFit = () => {
    dispatch(changeFitBounds(true))
    dispatch(changeLocationStatus(LocationStatus.idle))
  }

  return (
    <Button
      variant="map"
      title={'Fit route'}
      onClick={handleRouteFit}
      disabled={drawCoords.length === 0}
    >
      <Icon svg={FitIcon} />
    </Button>
  )
}

export { MapControlFitRoute }
