import { styled } from 'styled-components'

const StyledSidebarContainer = styled.aside<{ isSidebarOpen: boolean }>`
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
  padding: ${({ isSidebarOpen }) => (isSidebarOpen ? '1rem' : '0.2rem')};
  @media (min-width: 650px) {
    overflow: visible;
    z-index: 2;
    position: absolute;
    max-width: 18.75rem;
    min-width: 4rem;
    width: ${({ isSidebarOpen }) => (isSidebarOpen ? '18.75rem' : '4rem')};
    right: 0;
    top: 0;
    margin-top: 0;
    height: 100%;
    border-left: 2px solid #cfcfcf;
    box-shadow: -2px 0px 18px -6px rgba(0, 0, 0, 0.25);
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

const StyledDragButton = styled.button`
  display: none;
  @media (min-width: 650px) {
    display: block;
  }
  border: 2px solid #cfcfcf;
  cursor: pointer;
  z-index: 3;
  position: absolute;
  top: 50%;
  left: -1.25rem;
  background-color: #fafafa;
  padding: 0.4rem;
  border-radius: 9999px;
  font-size: 1.1rem;
  box-shadow: 0px 0px 8px -3px rgba(0, 0, 0, 0.25);
  color: #cecece;

  &:hover {
    background-color: #f3f3f3;
  }

  &:active,
  &:focus {
    background-color: #e4e4e4;
    color: #9e9e9e;
  }
`

const StyledCopyrightTitle = styled.h3`
  font-family: var(--font-roboto), sans-serif;
  color: #cdcdcd;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.015em;
  letter-spacing: 0.01rem;
`

const StyledSidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
  margin-top: auto;
  margin-bottom: 2rem;
`

export {
  StyledSidebarContainer,
  StyledDragDecoration,
  StyledSidebarContent,
  StyledDragButton,
  StyledCopyrightTitle,
  StyledSidebarFooter,
}
