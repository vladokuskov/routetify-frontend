import {
  StyledMapControls,
  StyledMapMainOverlay,
  StyledMapOverlay,
  StyledMapZoomWrapper,
  StyledMapMainControls,
} from './MapControls.styles'
import { MapControlUndo } from './undo/MapControlUndo'
import { MapControlRedo } from './redo/MapControlRedo'
import { MapControlDelete } from './delete/MapControlDelete'
import { MapControlFit } from './fit/MapControlFit'
import { MapControlLocation } from './location/MapControlLocation'
import { MapControlDraw } from './draw/MapControlDraw'

const MapControls = () => {
  return (
    <StyledMapMainOverlay>
      <StyledMapOverlay>
        <StyledMapMainControls>
          <StyledMapControls>
            <MapControlUndo />
            <MapControlRedo />
            <MapControlDelete />
            <MapControlFit />
            <MapControlLocation />
            <MapControlDraw />
          </StyledMapControls>
        </StyledMapMainControls>
      </StyledMapOverlay>
    </StyledMapMainOverlay>
  )
}

export default MapControls
