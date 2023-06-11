import { Button } from '@/components/Button/Button'
import { Layer } from '@/types/global/layer.types'
import Image from 'next/image'

interface TileButton {
  selectedLayer: Layer
  handleTileSelect: (tile: Layer) => void
  tile: Layer
}

const TileButton = ({ selectedLayer, handleTileSelect, tile }: TileButton) => {
  return (
    <Button
      variant="tile"
      title={`${
        tile === Layer.default
          ? 'Default'
          : tile === Layer.satellite
          ? 'Satellite'
          : null
      } tile ${
        tile === Layer.default ? 'N' : tile === Layer.satellite ? 'M' : null
      }`}
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
      {tile === Layer.default
        ? 'Default'
        : tile === Layer.satellite
        ? 'Satellite'
        : null}
    </Button>
  )
}

export { TileButton }
