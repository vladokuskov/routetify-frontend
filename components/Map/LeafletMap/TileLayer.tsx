import { mapConfig } from '@/config/map'
import { useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/layer.types'
import { useMemo, useState } from 'react'
import { TileLayer } from 'react-leaflet'

const StyleMap = () => {
  const [mapUrl, setMapUrl] = useState<string>(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  )
  const { layer } = useAppSelector((state) => state.controlsReducer)

  useMemo(() => {
    if (layer === Layer.default) {
      setMapUrl(mapConfig.layer.default)
    } else if (layer === Layer.satellite) {
      setMapUrl(mapConfig.layer.satellite)
    }
  }, [layer])

  return (
    <TileLayer
      url={mapUrl}
      maxNativeZoom={layer === Layer.satellite ? 19 : 19}
      maxZoom={21}
    />
  )
}

export default StyleMap
