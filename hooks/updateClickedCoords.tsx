import { useState, useEffect } from 'react';
import { updateDrawCoords } from '../redux/features/drawSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { DrawType } from '@/types/global/index.types';

const useClickedCoords = (e: L.Map | null) => {
  const drawType = useAppSelector((state) => state.controlsReducer.draw);
  const dispatch = useAppDispatch();

  // Creating state for clicked coords ( map )
  const [clickedCoords, setClickedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!e) return;

    // Check if 'Hand' or 'Road' is active and update clicked coords state only if
    // one of those is active
    if (e) {
      if (drawType === DrawType.None) return;
      if (drawType === DrawType.Hand || drawType === DrawType.Road) {
        e.on('click', (e: { latlng: { lat: number; lng: number } }) => {
          setClickedCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
        });
      }
    }
  }, [e, drawType]);

  useEffect(() => {
    if (!clickedCoords) return;

    // When clicked coords state is updating, change draw coords and draw markers and route on map

    if (clickedCoords && drawType === DrawType.Road) {
      dispatch(updateDrawCoords(clickedCoords));
    } else if (clickedCoords && drawType === DrawType.Hand) {
      dispatch(updateDrawCoords(clickedCoords));
    } else {
      setClickedCoords(null);
    }
  }, [clickedCoords]);
};

export default useClickedCoords;