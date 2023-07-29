import { Button } from '@/components/Button/Button'
import { Route } from '@/types/global/export.types'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface TypeSelectionButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  selectedType: Route
  handleRouteTypeChange: (type: Route) => void
  routeType: Route
  children: ReactNode
}

const TypeSelectionButton = ({
  selectedType,
  handleRouteTypeChange,
  routeType,
  children,
}: TypeSelectionButton) => {
  return (
    <Button
      variant="routeType"
      onClick={() => handleRouteTypeChange(routeType)}
      disabled={selectedType === routeType}
    >
      {children}
    </Button>
  )
}

export { TypeSelectionButton }
