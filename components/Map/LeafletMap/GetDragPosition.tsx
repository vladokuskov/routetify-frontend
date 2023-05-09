import { changeCurrentCoords, changeLocationStatus } from '@/redux/features/controlsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useMapEvents } from 'react-leaflet';


function GetPositionByDragging() {
  const dispatch = useAppDispatch();
  useMapEvents({
    drag: (e: L.LeafletEvent) => {
      dispatch(
        changeCurrentCoords({
          currentCoords: {
            lat: e.target.getCenter().lat,
            lng: e.target.getCenter().lng,
            zoom: e.target.getZoom(),
          },
        })
      );
    },
    dragstart: () => {
      dispatch(changeLocationStatus(false));
    },
  });
  return null;
}

export default GetPositionByDragging;
