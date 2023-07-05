import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { changeLocationStatus } from '@/redux/features/controlsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { LocationStatus } from '@/types/global/locationStatus.types'
import RepeatIcon from '../../../../assets/icons/repeat.svg'
import { useKeyDown } from '@/hooks/useKeyDown'
import { reverseRoute } from '@/redux/features/drawSlice'

const MapControlReverseRoute = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const handleRouteReverse = () => {
    if (drawCoords.length > 0) {
      dispatch(reverseRoute())
    }
  }

  useKeyDown(() => {
    handleRouteReverse()
  }, ['KeyR'])

  return (
    <Button
      variant="map"
      title="Reverse route [R]"
      onClick={handleRouteReverse}
      disabled={drawCoords.length === 0}
    >
      <Icon svg={RepeatIcon} />
    </Button>
  )
}

export { MapControlReverseRoute }
