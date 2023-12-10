import { Button } from '@/components/ui/button'
import DeleteIcon from '@/assets/icons/delete.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { deleteDrawCoords } from '@/redux/features/drawSlice'
import Icon from '@/components/ui/icon'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { KeybindTooltip } from '@/components/ui/keybind-tooltip'
import { useState } from 'react'

const MapControlDeleteRoute = () => {
  const dispatch = useAppDispatch()

  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false)

  const handleDelete = () => {
    if (drawCoords.length > 0) {
      dispatch(deleteDrawCoords(null))
    }

    setIsConfirmationOpen(false)
  }

  useHotkeys('alt+d', () => setIsConfirmationOpen(true))

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="map"
              size="cube"
              aria-label="Delete route"
              onClick={() => setIsConfirmationOpen(true)}
              disabled={drawCoords.length === 0}
              status="danger"
            >
              <Icon svg={DeleteIcon} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} side="left" avoidCollisions>
            <p>
              Delete route <KeybindTooltip>ALT+D</KeybindTooltip>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog open={isConfirmationOpen}>
        <AlertDialogContent
          onEscapeKeyDown={() => setIsConfirmationOpen(false)}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete route?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can undone this action by pressing undo button.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsConfirmationOpen(false)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export { MapControlDeleteRoute }
