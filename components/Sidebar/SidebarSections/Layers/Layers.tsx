import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { StyledSidebarSectionContent } from '../../SidebarSection/SidebarSection.styles'
import { Button } from '@/components/Button/Button'
import { Layer } from '@/types/global/index.types'

const Layers = () => {
  const layer = useAppSelector((state) => state.controlsReducer.layer)
  const currentCoords = useAppSelector(
    (state) => state.controlsReducer.currentCoords,
  )
  const dispatch = useAppDispatch()

  const handleLayerChange = (e: Layer) => {
    if (e === Layer.default) {
      dispatch(
        addLatLng({
          lat: currentCoords.lat,
          lng: currentCoords.lng,
        }),
      )
      window.scrollTo(0, 0)
      dispatch(changeLayer(Layer.default))
    } else if (e === Layer.satellite) {
      dispatch(
        addLatLng({
          lat: currentCoords.lat,
          lng: currentCoords.lng,
        }),
      )
      dispatch(changeLayer(Layer.satellite))
      window.scrollTo(0, 0)
    }
  }

  return (
    <StyledSidebarSectionContent>
      <Button
        variant="iconWithText"
        text="Default"
        onClick={() => handleLayerChange(Layer.default)}
        full="true"
        isDisabled={layer === Layer.default ? 'true' : 'false'}
      />
      <Button
        variant="iconWithText"
        text="Satellite"
        onClick={() => handleLayerChange(Layer.satellite)}
        full="true"
        isDisabled={layer === Layer.satellite ? 'true' : 'false'}
      />
    </StyledSidebarSectionContent>
  )
}

export { Layers }
