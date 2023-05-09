import { changeLayer } from "@/redux/features/controlsSlice";
import { addLatLng } from "@/redux/features/geocoderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


const Layer = () => {
  const layer = useAppSelector((state) => state.controlsReducer);
  const dispatch = useAppDispatch();

  const handleLayerChange = (e: string) => {
    // Handle layer change by conditions
    if (e === 'toDefault') {
      dispatch(
        addLatLng({
          lat: layer.currentCoords.lat,
          lng: layer.currentCoords.lng,
        })
      );
      window.scrollTo(0, 0);
      dispatch(changeLayer('default'));
    } else if (e === 'toSatellite') {
      dispatch(
        addLatLng({
          lat: layer.currentCoords.lat,
          lng: layer.currentCoords.lng,
        })
      );
      dispatch(changeLayer('satellite'));
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => handleLayerChange('toDefault')}>Default</button>
        <button onClick={() => handleLayerChange('toSatellite')}>
          Satellite
        </button>
      </div>
    </>
  );
};

export { Layer };
