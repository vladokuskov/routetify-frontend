import { styled } from 'styled-components';

const StyledMapControls = styled.div`
  position: fixed;
  display: grid;
  gap: 1rem;
  right: 0.5rem;
  top: 4rem;
  padding-left: 0.8rem;
  padding-bottom: 0.5rem;
  padding-top: 0.3rem;
  z-index: 1000;
  @media (max-height: 374px) {
    @include flexCenter(row, 0.5rem);
    padding: 0 !important;
  }
`;

export { StyledMapControls };
