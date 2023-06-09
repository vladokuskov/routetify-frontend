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
import { useAppSelector } from '@/redux/hooks'

const MapControls = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  return (
    <StyledMapMainOverlay>
      <StyledMapOverlay>
        <Contributors />
        <StyledMapMainControls isSidebarOpen={isSidebarOpen}>
          <StyledMapControls isSidebarOpen={isSidebarOpen}>
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
