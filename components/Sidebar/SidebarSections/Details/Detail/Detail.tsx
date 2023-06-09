import {
  StyledDetailContainer,
  StyledDetailSubTitle,
  StyledDetailTitle,
  StyledDetailDescription,
  StyledDetailFooter,
} from './Detail.styles'
import { TDetail } from './Detail.types'

const Detail = ({ title, subTitle, description }: TDetail) => {
  return (
    <StyledDetailContainer>
      <StyledDetailTitle>{title}</StyledDetailTitle>
      <StyledDetailFooter>
        <StyledDetailSubTitle>{subTitle}</StyledDetailSubTitle>
        <StyledDetailDescription>{description}</StyledDetailDescription>
      </StyledDetailFooter>
    </StyledDetailContainer>
  )
}

export { Detail }
