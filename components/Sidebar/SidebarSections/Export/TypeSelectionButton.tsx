import { Button } from '@/components/Button/Button'
import { Route } from '@/types/global/export.types'

interface TypeSelectionButton {
  selectedType: Route
  handleRouteTypeChange: (type: Route) => void
  type: Route
}

const TypeSelectionButton = ({
  selectedType,
  handleRouteTypeChange,
  type,
}: TypeSelectionButton) => {
  return (
    <Button
      variant="routeType"
      title={
        selectedType === Route.GPX
          ? 'GPX'
          : selectedType === Route.KML
          ? 'KML'
          : ''
      }
      onClick={() => handleRouteTypeChange(type)}
      disabled={selectedType === type}
    >
      {type === Route.GPX ? 'GPX' : type === Route.KML ? 'KML' : null}
    </Button>
  )
}

export { TypeSelectionButton }
