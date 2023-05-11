import { Button } from '@/components/Button/Button'
import FitIcon from '../../../../assets/icons/fit.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  changeFitBounds,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { LocationStatus } from '@/types/global/locationStatus.types'

const MapControlFit = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const handleRouteFit = () => {
    dispatch(changeFitBounds(true))
    dispatch(changeLocationStatus(LocationStatus.idle))
  }

  return (
    <Button
      variant="icon"
      text="Fit route"
      icon={FitIcon}
      onClick={handleRouteFit}
      isDisabled={drawCoords.length === 0 ? 'true' : 'false'}
    />
  )
}

export { MapControlFit }
