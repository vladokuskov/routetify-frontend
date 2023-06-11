import { Button } from '@/components/Button/Button'
import Icon from '@/components/Icon/Icon'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useKeyDown } from '@/hooks/useKeyDown'
import { changeLayer } from '@/redux/features/controlsSlice'
import { addLatLng } from '@/redux/features/geocoderSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Layer } from '@/types/global/layer.types'
import Image from 'next/image'
import { useRef } from 'react'
import LayersIcon from '../../../../assets/icons/layers.svg'
import clsx from 'clsx'

const MapControlTileSelection = () => {
  const ref = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useClickOutside(ref, false)

  const layer = useAppSelector((state) => state.controlsReducer.layer)
  const currentCoords = useAppSelector(
    (state) => state.controlsReducer.currentCoords,
  )

  const dispatch = useAppDispatch()

  const handleTileSelect = (layer: Layer) => {
    dispatch(
      addLatLng({
        lat: currentCoords.lat,
        lng: currentCoords.lng,
      }),
    )
    dispatch(changeLayer(layer))
  }

  useKeyDown(() => {
    if (layer !== Layer.default) {
      handleTileSelect(Layer.default)
    }
  }, ['KeyN'])

  useKeyDown(() => {
    if (layer !== Layer.satellite) {
      handleTileSelect(Layer.satellite)
    }
  }, ['KeyM'])

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="relative" ref={ref}>
      <Button variant="map" title={'Change map tile'} onClick={handleMenuOpen}>
        <Icon svg={LayersIcon} />
      </Button>
      {isMenuOpen && (
        <div
          className={clsx(
            'absolute font-roboto font-semibold gap-1 right-11 bottom-0 rounded-md p-1 bg-app shadow flex flex-col items-center justify-center',
            'max-hsm:bottom-auto max-hsm:top-11 max-hsm:!right-0',
          )}
        >
          <Button
            variant="tile"
            title="Default tile [N]"
            disabled={layer === Layer.default}
            onClick={() => handleTileSelect(Layer.default)}
          >
            <div className="relative w-5 h-5">
              <Image
                fill
                priority
                quality={30}
                src="/icons/default.webp"
                alt=""
                style={{ borderRadius: '4px' }}
              />
            </div>
            Default
          </Button>
          <Button
            variant="tile"
            title="Satellite tile [M]"
            disabled={layer === Layer.satellite}
            onClick={() => handleTileSelect(Layer.satellite)}
          >
            <div className="relative w-5 h-5">
              <Image
                fill
                priority
                quality={30}
                src="/icons/satellite.webp"
                alt=""
                style={{ borderRadius: '4px' }}
              />
            </div>
            Satellite
          </Button>
        </div>
      )}
    </div>
  )
}

export { MapControlTileSelection }
