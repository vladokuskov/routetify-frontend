import Icon from '@/components/Icon/Icon'
import SunIcon from '../../../../assets/icons/sun.svg'
import MoonIcon from '../../../../assets/icons/moon-filled.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Theme } from '@/types/global/theme.types'
import { changeTheme } from '@/redux/features/controlsSlice'

const ThemeSwitcher = () => {
  const theme = useAppSelector((state) => state.controlsReducer.theme)

  const dispatch = useAppDispatch()

  return (
    <button
      onClick={() => dispatch(changeTheme())}
      title="Change theme"
      className=" text-neutral-600 hocus:bg-neutral-200 hocus:text-neutral-700 p-2 rounded-md transition-colors"
    >
      <Icon svg={theme === Theme.Light ? SunIcon : MoonIcon} />
    </button>
  )
}

export { ThemeSwitcher }
