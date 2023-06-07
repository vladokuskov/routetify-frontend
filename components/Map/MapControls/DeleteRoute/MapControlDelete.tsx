import { Button } from '@/components/Button/Button'
import DeleteIcon from '../../../../assets/icons/delete.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { deleteDrawCoords, updateDrawInfo } from '@/redux/features/drawSlice'
import Icon from '@/components/Icon/Icon'

const MapControlDeleteRoute = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const handleDelete = () => {
    let isConfirmed = window.confirm(
      'Are you sure you want to delete the route??',
    )

    if (isConfirmed) {
      dispatch(deleteDrawCoords(null))
      dispatch(updateDrawInfo({ time: '0', dist: '0' }))
    } else {
      return null
    }
  }

  return (
    <Button
      variant="map"
      title={'Delete route'}
      onClick={handleDelete}
      disabled={drawCoords.length === 0}
      status="danger"
    >
      <Icon svg={DeleteIcon} />
    </Button>
  )
}

export { MapControlDeleteRoute }
