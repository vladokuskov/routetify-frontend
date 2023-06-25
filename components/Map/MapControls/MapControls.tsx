import { useAppSelector } from '@/redux/hooks'
import clsx from 'clsx'
import { Contributors } from '../Contributors/Contributors'
import { MapControlDeleteRoute } from './DeleteRoute/MapControlDelete'
import { MapControlDrawSelection } from './DrawSelection/MapControlDraw'
import { MapControlFindLocation } from './FindLocation/MapControlLocation'
import { MapControlFitRoute } from './FitRoute/MapControlFit'
import { MapControlRedoAction } from './RedoAction/MapControlRedo'
import { MapControlTileSelection } from './TilesSelector/MapControlTileSelection'
import { MapControlUndoAction } from './UndoAction/MapControlUndo'

const MapControls = () => {
  const isSidebarOpen = useAppSelector(
    (state) => state.controlsReducer.isSidebarOpen,
  )

  return (
    <div className="fixed w-full f-full pointer-events-none z-[1003]">
      <div className="relative w-full h-full pointer-events-none">
        <Contributors />
        <div
          className={clsx(
            'absolute flex flex-col items-center justify-start top-7 py-2 px-3 pr-0 pointer-events-auto',
            'max-sm:right-3 max-hsm:!top-1',
            isSidebarOpen ? 'right-[20.3rem]' : 'right-[4.5rem]',
          )}
        >
          <section
            className={clsx(
              'flex flex-col items-center justify-start gap-4',
              'max-hsm:!flex-row',
            )}
          >
            <MapControlUndoAction />
            <MapControlRedoAction />
            <MapControlDeleteRoute />
            <MapControlFitRoute />
            <MapControlFindLocation />
            <MapControlDrawSelection />
            <MapControlTileSelection />
          </section>
        </div>
      </div>
    </div>
  )
}

export default MapControls
