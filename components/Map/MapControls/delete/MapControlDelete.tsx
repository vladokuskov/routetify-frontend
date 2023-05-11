import { Button } from '@/components/Button/Button'
import DeleteIcon from '../../../../assets/icons/delete.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { deleteDrawCoords, updateDrawInfo } from '@/redux/features/drawSlice'

const MapControlDelete = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const handleDelete = () => {
    let isConfirmed = window.confirm('Are you sure you want delete route?')

    if (isConfirmed) {
      dispatch(deleteDrawCoords(null))
      dispatch(updateDrawInfo({ time: '0', dist: '0' }))
    } else {
      return null
    }
  }

  return (
    <Button
      variant="icon"
      text="Delete route"
      icon={DeleteIcon}
      onClick={() => {
        handleDelete()
      }}
      isDisabled={drawCoords.length === 0 ? 'true' : 'false'}
      status="danger"
    />
  )
}

export { MapControlDelete }
