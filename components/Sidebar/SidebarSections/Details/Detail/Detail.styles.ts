import { styled } from 'styled-components'

const StyledDetailContainer = styled.div`
  font-family: var(--font-roboto), sans-serif;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.2rem;
  background-color: #e3e0cf;
  border-radius: 8px;
  padding: 0.2rem;
  min-width: 5rem;
`

const StyledDetailTitle = styled.h4`
  font-size: 18px;
  line-height: 23px;
  letter-spacing: -0.004em;
  font-weight: 700;
  color: #2c2c2c;
`

const StyledDetailSubTitle = styled.p`
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  letter-spacing: 0.01em;
  color: #2c2c2c90;
`

export { StyledDetailContainer, StyledDetailTitle, StyledDetailSubTitle }
