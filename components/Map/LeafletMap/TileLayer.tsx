import { useMemo, useState } from 'react'
import { TileLayer } from 'react-leaflet'
import { useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/index.types'
import { mapConfig } from '@/config/map'

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

  return <TileLayer url={mapUrl} />
}

export default StyleMap
