import { Button } from '@/components/Button/Button'
import { Route } from '@/types/global/export.types'
import { ReactNode } from 'react'

interface TypeSelectionButton {
  selectedType: Route
  handleRouteTypeChange: (type: Route) => void
  type: Route
  title: string
  children: ReactNode
}

const TypeSelectionButton = ({
  selectedType,
  handleRouteTypeChange,
  type,
  title,
  children,
}: TypeSelectionButton) => {
  return (
    <Button
      variant="routeType"
      title={title}
      onClick={() => handleRouteTypeChange(type)}
      disabled={selectedType === type}
    >
      {children}
    </Button>
  )
}

export { TypeSelectionButton }
