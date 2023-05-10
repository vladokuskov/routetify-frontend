import { styled } from 'styled-components';

const StyledSidebarContainer = styled.div`
  position: relative;
  z-index: 20;
  overflow-y: hidden;
  margin-top: calc(70vh);
  width: 100%;
  z-index: 1001;
  background-color: #f8f6f6;
  height: 100lvh;
  box-shadow: 0 -7px 10px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 -7px 10px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 -7px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  @media (min-width: 530px) {
    z-index: 2;
    position: absolute;
    max-width: 18.75rem;
    left: 0;
    top: 0;
    margin-top: 0;
    height: 100%;
    -webkit-box-shadow: -7px 0px 20px 3px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: -7px 0px 20px 3px rgba(0, 0, 0, 0.3);
    box-shadow: -7px 0px 20px 3px rgba(0, 0, 0, 0.3);
  }
`;

const StyledDragDecoration = styled.div`
  height: 0.3rem;
  width: 1.8rem;
  border-radius: 0.2rem;
  background-color: #2c2c2c50;
  @media (min-width: 530px) {
    display: none;
  }
`;

const StyledSidebarContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  margin: 0 auto;
`;

export { StyledSidebarContainer, StyledDragDecoration, StyledSidebarContent };