import { Button } from '@/components/Button/Button'
import { Layer } from '@/types/global/layer.types'
import Image from 'next/image'
import { ReactNode } from 'react'

interface TileButton {
  selectedLayer: Layer
  handleTileSelect: (tile: Layer) => void
  tile: Layer
  title: string
  children: ReactNode
}

const TileButton = ({
  selectedLayer,
  handleTileSelect,
  tile,
  title,
  children,
}: TileButton) => {
  return (
    <Button
      variant="tile"
      title={title}
      disabled={selectedLayer === tile}
      onClick={() => handleTileSelect(tile)}
    >
      <div className="relative w-5 h-5">
        <Image
          fill
          priority
          quality={30}
          src={`/icons/${
            tile === Layer.default
              ? 'default'
              : tile === Layer.satellite
              ? 'satellite'
              : null
          }.webp`}
          alt=""
          style={{ borderRadius: '4px' }}
        />
      </div>
      {children}
    </Button>
  )
}

export { TileButton }
