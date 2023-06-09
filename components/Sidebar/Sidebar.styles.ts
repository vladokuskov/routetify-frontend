import Image from 'next/image'
import { styled } from 'styled-components'

const StyledSidebarContainer = styled.aside`
  position: relative;
  z-index: 20;
  overflow-y: scroll;
  margin-top: calc(70vh);
  width: 100%;
  z-index: 1001;
  background-color: #f8f6f6;
  height: 100lvh;
  box-shadow: 0 -7px 10px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 -7px 10px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 -7px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  @media (min-width: 650px) {
    z-index: 2;
    position: absolute;
    max-width: 18.75rem;
    right: 0;
    top: 0;
    margin-top: 0;
    height: 100%;
    box-shadow: 25px 0px 20px 20px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 0.4rem;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a0a0a0;
  }
`

const StyledDragDecoration = styled.div`
  height: 0.3rem;
  width: 1.8rem;
  border-radius: 0.2rem;
  background-color: #2c2c2c50;
  @media (min-width: 650px) {
    display: none;
  }
`

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
`

export { StyledSidebarContainer, StyledDragDecoration, StyledSidebarContent }
