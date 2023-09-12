import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { changeLocationStatus } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import FitIcon from '@/assets/icons/fit.svg'
import fitBounds from '@/lib/fitBounds'
import { useHotkeys } from 'react-hotkeys-hook'

const MapControlFitRoute = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)
  const map = useAppSelector((state) => state.controlsReducer.map)

  const handleRouteFit = () => {
    if (drawCoords.length > 0) {
      dispatch(changeLocationStatus(LocationStatus.idle))

      fitBounds(map, drawCoords)
    }
  }

  useHotkeys('alt+o', handleRouteFit)

  return (
    <Button
      variant="map"
      title="Fit route [ALT + O]"
      aria-label="Fit route"
      onClick={handleRouteFit}
      disabled={drawCoords.length === 0}
    >
      <Icon svg={FitIcon} />
    </Button>
  )
}

export { MapControlFitRoute }
