import { LeafletMap } from './LeafletMap/Map';
import { StyledMapMainContainer, StyledMapContainer } from './Map.styles';
import MapControls from './MapControls/MapControls';

const Map = () => {
  return (
    <StyledMapMainContainer>
      <StyledMapContainer>
        <MapControls />
        <LeafletMap />
      </StyledMapContainer>
    </StyledMapMainContainer>
  );
};

export { Map };
