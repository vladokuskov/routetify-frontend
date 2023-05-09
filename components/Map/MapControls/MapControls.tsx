
import { deleteDrawCoords, redoDrawCoords, undoDrawCoords, updateDrawInfo } from '@/redux/features/drawSlice';
import { StyledMapControls } from './MapControls.styles';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';


import { useState, useEffect } from 'react';
import { changeCurrentCoords, changeFitBounds, changeLocationStatus } from '@/redux/features/controlsSlice';
import { addLatLng } from '@/redux/features/geocoderSlice';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default function MapControls() {
  const [isLocationFetching, setIsLocationFetching] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords);
  const drawType = useAppSelector((state) => state.controlsReducer.draw);

  const handleDelete = () => {
    dispatch(deleteDrawCoords(null));
    dispatch(
      updateDrawInfo({
        time: '0000',
        dist: '0000',
      })
    );
  };

  const handleRouteFit = () => {
    dispatch(changeFitBounds(true));
    dispatch(changeLocationStatus(false));
  };

  const getPos = (data: {
    coords: { latitude: number; longitude: number };
  }) => {
    setIsLocationFetching(false);
    dispatch(changeLocationStatus(true));
    dispatch(
      addLatLng({
        lat: data.coords.latitude,
        lng: data.coords.longitude,
        zoom: 16,
      })
    );
    dispatch(
      changeCurrentCoords({
        currentCoords: {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
          zoom: 16,
        },
      })
    );
  };

  const error = (err: { code: number; message: string }) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    setIsLocationFetching(false);
  };

  useEffect(() => {
    if (isLocationFetching) {
      navigator.geolocation.getCurrentPosition(getPos, error, options);
    }
  }, [isLocationFetching]);

  useEffect(() => {
    handleDelete();
  }, [location]);

  return (
    <StyledMapControls>
      <button
        className="map-controls--button"
        title="Undo action [Q]"
        aria-label="Undo action [Q]"
        disabled={drawCoords.length === 0 || drawType === 'None'}
        onClick={() => dispatch(undoDrawCoords(null))}
      >
        Undo
      </button>
      <button onClick={() => dispatch(redoDrawCoords(null))}>Redo</button>
      <button
        onClick={() => {
          handleDelete();
        }}
      >
        Delete
      </button>
      <button onClick={handleRouteFit}>Fit</button>
      <button onClick={() => setIsLocationFetching(true)}>Location</button>
    </StyledMapControls>
  );
}
