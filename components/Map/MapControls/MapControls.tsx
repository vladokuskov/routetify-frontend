import { StyledMapControls } from './MapControls.styles'
import { MapControlUndo } from './undo/MapControlUndo'
import { MapControlRedo } from './redo/MapControlRedo'
import { MapControlDelete } from './delete/MapControlDelete'
import { MapControlFit } from './fit/MapControlFit'
import { MapControlLocation } from './location/MapControlLocation'
import { MapControlDraw } from './draw/MapControlDraw'

const MapControls = () => {
  return (
    <StyledMapControls>
      <MapControlUndo />

      <MapControlRedo />

      <MapControlDelete />

      <MapControlFit />

      <MapControlLocation />

      <MapControlDraw />
    </StyledMapControls>
  )
}

export default MapControls
