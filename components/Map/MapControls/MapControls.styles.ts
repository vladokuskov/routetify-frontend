import { styled } from 'styled-components'

const StyledMapControls = styled.div`
  position: fixed;
  display: grid;
  gap: 1rem;
  right: 0.7rem;
  top: 4rem;
  padding-left: 0.8rem;
  padding-bottom: 0.5rem;
  padding-top: 0.3rem;
  z-index: 1003;
  @media (max-height: 550px) {
    @include flexCenter(row, 0.5rem);
    padding: 0 !important;
    display: flex;
    top: 0.7rem;
  }

  @media (min-width: 650px) {
    right: 19.3rem;
  }
`

export { StyledMapControls }
