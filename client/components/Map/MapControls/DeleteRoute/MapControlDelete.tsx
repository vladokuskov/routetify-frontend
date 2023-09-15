import { Button } from '@/components/ui/button'
import DeleteIcon from '@/assets/icons/delete.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { deleteDrawCoords, updateDrawInfo } from '@/redux/features/drawSlice'
import Icon from '@/components/ui/icon'
import { useHotkeys } from 'react-hotkeys-hook'

const MapControlDeleteRoute = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const handleDelete = () => {
    if (drawCoords.length > 0) {
      let isConfirmed = window.confirm(
        'Are you sure you want to delete route??',
      )

      if (isConfirmed) {
        dispatch(deleteDrawCoords(null))
        dispatch(updateDrawInfo({ time: '0', dist: '0' }))
      } else {
        return null
      }
    }
  }

  useHotkeys('alt+d', handleDelete)

  return (
    <Button
      variant="map"
      size="cube"
      title="Delete route [ALT + D]"
      aria-label="Delete route"
      onClick={handleDelete}
      disabled={drawCoords.length === 0}
      status="danger"
    >
      <Icon svg={DeleteIcon} />
    </Button>
  )
}

export { MapControlDeleteRoute }
