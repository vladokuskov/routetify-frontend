import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { useAppSelector } from '@/redux/hooks'
import MinusIcon from '../../../../assets/icons/minus.svg'
import PlusIcon from '../../../../assets/icons/plus.svg'

const MapControlZoom = () => {
  const map = useAppSelector((state) => state.controlsReducer.map)

  const handleZoomIn = () => {
    map && map.setZoom(map.getZoom() + 1)
  }

  const handleZoomOut = () => {
    map && map.setZoom(map.getZoom() - 1)
  }

  return (
    <div className="absolute left-1 pointer-events-auto flex flex-col gap-1 items-center justify-center">
      <Button
        variant="map"
        title="Zoom in"
        onClick={handleZoomIn}
        className="w-8 h-8 font-bold"
      >
        <Icon svg={PlusIcon} width="20" height="20" />
      </Button>
      <Button
        variant="map"
        title="Zoom in"
        onClick={handleZoomOut}
        className="w-8 h-8 font-bold"
      >
        <Icon svg={MinusIcon} width="20" height="20" />
      </Button>
    </div>
  )
}

export { MapControlZoom }
