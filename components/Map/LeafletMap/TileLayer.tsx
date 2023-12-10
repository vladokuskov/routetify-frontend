import { useAppSelector } from '@/redux/hooks'
import { useMemo, useState } from 'react'
import { TileLayer } from 'react-leaflet'

const StyleMap = () => {
  const [mapUrl, setMapUrl] = useState<string>(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  )
  const layer = useAppSelector((state) => state.controlsReducer.layer)

  useMemo(() => {
    setMapUrl(layer.url)
  }, [layer])

  return (
    <TileLayer
      url={mapUrl}
      maxNativeZoom={17}
      maxZoom={22}
      minZoom={3}
      key={layer.url}
      className={layer.name === 'default' ? 'dark:to-dark-filter' : ''}
    />
  )
}

export default StyleMap
