import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import RepeatIcon from '@/assets/icons/repeat.svg'
import { reverseRoute } from '@/redux/features/drawSlice'
import { useHotkeys } from 'react-hotkeys-hook'

const MapControlReverseRoute = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const handleRouteReverse = () => {
    if (drawCoords.length > 0) {
      dispatch(reverseRoute())
    }
  }

  useHotkeys('alt+r', handleRouteReverse)

  return (
    <Button
      variant="map"
      title="Reverse route [ALT + R]"
      aria-label="Reverse route"
      onClick={handleRouteReverse}
      disabled={drawCoords.length === 0}
    >
      <Icon svg={RepeatIcon} />
    </Button>
  )
}

export { MapControlReverseRoute }
