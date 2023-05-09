import { useEffect } from 'react';

import * as L from 'leaflet';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { changeFitBounds } from '../redux/features/controls';

const useFitBoundsOnClick = (e: L.Map | null) => {
  const drawCoords = useAppSelector((state) => state.draw.drawCoords);
  const isFitBounds = useAppSelector((state) => state.controls.isFitBounds);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (e && isFitBounds) {
      e.fitBounds(drawCoords as L.LatLngBoundsExpression);
      dispatch(changeFitBounds(false));
    }
  }, [isFitBounds, drawCoords]);
};

export default useFitBoundsOnClick;
