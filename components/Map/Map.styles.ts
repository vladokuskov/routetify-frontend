import { styled } from 'styled-components'

const StyledMapMainContainer = styled.main<{ isSidebarOpen: boolean }>`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 70vh;
  top: 0;
  right: 0;
  left: 0;
  @media (min-width: 650px) {
    position: static;
    width: 100%;
    height: 100%;
    margin-right: ${({ isSidebarOpen }) =>
      isSidebarOpen ? '18.75rem' : '4rem'};
    width: calc(
      100% - ${({ isSidebarOpen }) => (isSidebarOpen ? '18.75rem' : '4rem')}
    );
  }
`

const StyledMapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;

  .leaflet-control-zoom {
    border-radius: 10px !important;
    width: 40px;
    height: 80px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.28) !important;

    .leaflet-control-zoom-in,
    .leaflet-control-zoom-out {
      width: 100% !important;
      height: 50% !important;
      color: #5a5a5a !important;
      background-color: #fafafa;

      -webkit-tap-highlight-color: transparent;
      user-select: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      &:hover,
      &:focus {
        color: #858585 !important;
      }

      &:disabled,
      [aria-disabled='true'] {
        color: #bdbdbd !important;
      }
    }
  }

  .leaflet-control-zoom-in {
    border-radius: 10px 10px 0 0 !important;
  }

  .leaflet-control-zoom-out {
    border-radius: 0 0 10px 10px !important;
  }
`

export { StyledMapMainContainer, StyledMapContainer }
