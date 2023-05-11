import {
  deleteDrawCoords,
  redoDrawCoords,
  undoDrawCoords,
  updateDrawInfo,
} from '@/redux/features/drawSlice'
import { StyledMapControls } from './MapControls.styles'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import {
  changeCurrentCoords,
  changeFitBounds,
  changeLocationStatus,
} from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { Button } from '@/components/Button/Button'

import LocationIcon from '../../../assets/icons/location.svg'
import LocationFilledIcon from '../../../assets/icons/location-filled.svg'
import DeleteIcon from '../../../assets/icons/delete.svg'
import RedoIcon from '../../../assets/icons/redo.svg'
import UndoIcon from '../../../assets/icons/undo.svg'
import FitIcon from '../../../assets/icons/fit.svg'
import LoadingIcon from '../../../assets/icons/loader.svg'
import { DrawType, LocationStatus } from '@/types/global/index.types'

const MapControls = () => {
  const dispatch = useAppDispatch()
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const drawCoordsDeleted = useAppSelector(
    (state) => state.drawReducer.drawCoordsDeleted,
  )
  const drawCoordsFuture = useAppSelector(
    (state) => state.drawReducer.drawCoordsFuture,
  )
  const locationStatus = useAppSelector(
    (state) => state.controlsReducer.location,
  )
  const drawType = useAppSelector((state) => state.controlsReducer.draw)

  const handleDelete = () => {
    let isConfirmed = window.confirm('Are you sure you want delete route?')

    if (isConfirmed) {
      dispatch(deleteDrawCoords(null))
      dispatch(
        updateDrawInfo({
          time: '0',
          dist: '0',
        }),
      )
    } else {
      return null
    }
  }

  const handleRouteFit = () => {
    dispatch(changeFitBounds(true))
    dispatch(changeLocationStatus(LocationStatus.idle))
  }

  const getLocation = async () => {
    try {
      if (navigator.geolocation) {
        dispatch(changeLocationStatus(LocationStatus.fetching))
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const geoPoint = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              zoom: 16,
            }

            if (geoPoint) {
              dispatch(addLatLng(geoPoint))

              dispatch(changeCurrentCoords({ currentCoords: geoPoint }))

              dispatch(changeLocationStatus(LocationStatus.success))
            }
          },
          (error) => {
            dispatch(changeLocationStatus(LocationStatus.error))
          },
        )
      }
    } catch (error) {
      dispatch(changeLocationStatus(LocationStatus.error))
    }
  }

  return (
    <StyledMapControls>
      <Button
        variant="icon"
        text="Undo"
        icon={UndoIcon}
        onClick={() => dispatch(undoDrawCoords(null))}
        isDisabled={
          drawCoords.length === 0 || drawType === DrawType.None
            ? 'true'
            : 'false'
        }
      />

      <Button
        variant="icon"
        text="Redo"
        icon={RedoIcon}
        onClick={() => dispatch(redoDrawCoords(null))}
        isDisabled={
          (drawCoordsFuture.length === 0 && drawCoordsDeleted.length === 0) ||
          drawType === DrawType.None
            ? 'true'
            : 'false'
        }
      />

      <Button
        variant="icon"
        text="Delete"
        icon={DeleteIcon}
        onClick={() => {
          handleDelete()
        }}
        isDisabled={drawCoords.length === 0 ? 'true' : 'false'}
        status="danger"
      />

      <Button
        variant="icon"
        text="Fit route"
        icon={FitIcon}
        onClick={handleRouteFit}
        isDisabled={drawCoords.length === 0 ? 'true' : 'false'}
      />

      <Button
        variant="icon"
        text="Location"
        loading={locationStatus === LocationStatus.fetching ? 'true' : 'false'}
        icon={
          locationStatus === LocationStatus.success
            ? LocationFilledIcon
            : locationStatus === LocationStatus.fetching
            ? LoadingIcon
            : LocationIcon
        }
        onClick={getLocation}
        status={
          locationStatus === LocationStatus.error
            ? 'error'
            : locationStatus === LocationStatus.success
            ? 'success'
            : 'default'
        }
      />
    </StyledMapControls>
  )
}

export default MapControls
