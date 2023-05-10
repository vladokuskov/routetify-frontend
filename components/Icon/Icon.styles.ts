import { css, keyframes, styled } from 'styled-components'
import { IBoolean } from '@/types/global/index.types'

const spinKeyFrame = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const StyledIconWrapper = styled.span<{ spin: IBoolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    ${({ spin }) =>
      spin === 'true' &&
      css`
        animation: ${spinKeyFrame} 1s linear infinite;
      `}
  }
`

export { StyledIconWrapper }
