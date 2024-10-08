import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useAppSelector } from '@/redux/hooks'
import MinusIcon from '@/assets/icons/minus.svg'
import PlusIcon from '@/assets/icons/plus.svg'
import clsx from 'clsx'

const MapControlZoom = () => {
  const map = useAppSelector((state) => state.controlsReducer.map)

  const handleZoomIn = () => {
    map && map.setZoom(map.getZoom() + 1)
  }

  const handleZoomOut = () => {
    map && map.setZoom(map.getZoom() - 1)
  }

  return (
    <div
      className={clsx(
        'absolute left-2 bottom-2 pointer-events-auto flex flex-col gap-1 items-center justify-center',
        'max-sm:!bottom-[1rem]',
      )}
    >
      <Button
        variant="map"
        size="cube"
        title="Zoom in"
        aria-label="Zoom in"
        onClick={handleZoomIn}
        className="w-8 h-8 font-bold"
      >
        <Icon svg={PlusIcon} size={20} />
      </Button>
      <Button
        variant="map"
        size="cube"
        title="Zoom out"
        aria-label="Zoom in"
        onClick={handleZoomOut}
        className="w-8 h-8 font-bold"
      >
        <Icon svg={MinusIcon} size={20} />
      </Button>
    </div>
  )
}

export { MapControlZoom }
