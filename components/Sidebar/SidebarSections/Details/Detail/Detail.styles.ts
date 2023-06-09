import { styled } from 'styled-components'

const StyledDetailContainer = styled.div`
  font-family: var(--font-roboto), sans-serif;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.8rem;
  border-radius: 8px;
  padding: 0.4rem 0.2rem;
`

const StyledDetailTitle = styled.h4`
  font-size: 1.1rem;
  line-height: 1.2rem;
  letter-spacing: -0.004em;
  font-weight: 700;
  color: #717171;
  word-break: break-all;
`

const StyledDetailSubTitle = styled.p`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.01em;
  color: #717171;
  word-break: break-all;
`

const StyledDetailDescription = styled.p`
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 0.9rem;
  letter-spacing: 0.01em;
  color: #a1a1a1;
`

const StyledDetailFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export {
  StyledDetailContainer,
  StyledDetailTitle,
  StyledDetailSubTitle,
  StyledDetailDescription,
  StyledDetailFooter,
}
