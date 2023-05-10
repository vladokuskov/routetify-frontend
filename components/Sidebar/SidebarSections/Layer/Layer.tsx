import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles'
import { Button } from '@/components/Button/Button'

const Layer = () => {
  const layer = useAppSelector((state) => state.controlsReducer.layer)
  const currentCoords = useAppSelector(
    (state) => state.controlsReducer.currentCoords,
  )
  const dispatch = useAppDispatch()

  const handleLayerChange = (e: string) => {
    if (e === 'toDefault') {
      dispatch(
        addLatLng({
          lat: currentCoords.lat,
          lng: currentCoords.lng,
        }),
      )
      window.scrollTo(0, 0)
      dispatch(changeLayer('default'))
    } else if (e === 'toSatellite') {
      dispatch(
        addLatLng({
          lat: currentCoords.lat,
          lng: currentCoords.lng,
        }),
      )
      dispatch(changeLayer('satellite'))
      window.scrollTo(0, 0)
    }
  }

  return (
    <StyledSidebarSectionContent>
      <Button
        variant="iconWithText"
        text="Default"
        onClick={() => handleLayerChange('toDefault')}
        full="true"
        isDisabled={layer === 'default' ? 'true' : 'false'}
      />
      <Button
        variant="iconWithText"
        text="Satellite"
        onClick={() => handleLayerChange('toSatellite')}
        full="true"
        isDisabled={layer === 'satellite' ? 'true' : 'false'}
      />
    </StyledSidebarSectionContent>
  )
}

export { Layer }
