import { useMemo, useState } from 'react'
import { TileLayer } from 'react-leaflet'
import { useAppSelector } from '@/redux/hooks'

function StyleMap() {
  const [mapUrl, setMapUrl] = useState<string>(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  )
  const { layer } = useAppSelector((state) => state.controlsReducer)

  useMemo(() => {
    if (layer === 'default') {
      setMapUrl('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
    } else if (layer === 'satellite') {
      setMapUrl(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      )
    }
  }, [layer])

  return <TileLayer url={mapUrl} />
}

export default StyleMap
