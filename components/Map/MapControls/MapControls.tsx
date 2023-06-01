import {
  StyledMapControls,
  StyledMapMainOverlay,
  StyledMapOverlay,
  StyledMapMainControls,
} from './MapControls.styles'
import { MapControlUndoAction } from './UndoAction/MapControlUndo'
import { MapControlRedoAction } from './RedoAction/MapControlRedo'
import { MapControlDeleteRoute } from './DeleteRoute/MapControlDelete'
import { MapControlFitRoute } from './FitRoute/MapControlFit'
import { MapControlFindLocation } from './FindLocation/MapControlLocation'
import { MapControlDrawSelection } from './DrawSelection/MapControlDraw'
import { Contributors } from '../Contributors/Contributors'
import { MapControlTileSelection } from './TilesSelector/MapControlTileSelection'

const MapControls = () => {
  return (
    <StyledMapMainOverlay>
      <StyledMapOverlay>
        <Contributors />
        <StyledMapMainControls>
          <StyledMapControls>
            <MapControlUndoAction />
            <MapControlRedoAction />
            <MapControlDeleteRoute />
            <MapControlFitRoute />
            <MapControlFindLocation />
            <MapControlDrawSelection />
            <MapControlTileSelection />
          </StyledMapControls>
        </StyledMapMainControls>
      </StyledMapOverlay>
    </StyledMapMainOverlay>
  )
}

export default MapControls
