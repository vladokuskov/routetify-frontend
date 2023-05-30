import {
  StyledMapControls,
  StyledMapMainOverlay,
  StyledMapOverlay,
  StyledMapMainControls,
} from './MapControls.styles'
import { MapControlUndo } from './undo/MapControlUndo'
import { MapControlRedo } from './redo/MapControlRedo'
import { MapControlDelete } from './delete/MapControlDelete'
import { MapControlFit } from './fit/MapControlFit'
import { MapControlLocation } from './location/MapControlLocation'
import { MapControlDraw } from './draw/MapControlDraw'
import { Contributors } from './contributors/Contributors'
import { ChangeMapTiles } from './changeMapTiles/ChangeMapTiles'

const MapControls = () => {
  return (
    <StyledMapMainOverlay>
      <StyledMapOverlay>
        <Contributors />
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
        <ChangeMapTiles />
      </StyledMapOverlay>
    </StyledMapMainOverlay>
  )
}

export default MapControls
