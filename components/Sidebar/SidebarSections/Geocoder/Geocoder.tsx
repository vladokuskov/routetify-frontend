import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { useClickOutside } from '../../../../hooks/useClickOutside';
import { Input } from '../../../Input/Input';
import {
  StyledGeocoderContainer,
  StyledGeocoderResult,
  StyledGeocoderResultsContainer,
} from './Geocoder.styles';
import { TGeoResponse } from './Geocoder.types';
import { addLatLng } from '@/redux/features/geocoderSlice';
import { changeCurrentCoords, changeLocationStatus } from '@/redux/features/controlsSlice';
import { useAppDispatch } from '@/redux/hooks';

const Geocoder = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [geocoderValue, setGeocoderValue] = useState<string>('');
  const [geocoderResponse, setGeocoderResponse] = useState<
    TGeoResponse[] | null
  >(null);
  const [isGeocoderLoading, setIsGeocoderLoading] = useState<boolean>(false);
  const [isResultsOpen, setIsResultsOpen] = useClickOutside(ref, false);

  const dispatch = useAppDispatch();

  const handleChangeGeocoder = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setGeocoderValue(e.target.value);
  };

  const handleClear = () => {
    setGeocoderValue('');
    setGeocoderResponse(null);
  };

  const handleResultSelect = ({ lat, lon }: TGeoResponse) => {
    dispatch(
      addLatLng({
        lat: lat,
        lng: lon,
        zoom: 12,
      })
    );
    dispatch(
      changeCurrentCoords({
        currentCoords: {
          lat: lat,
          lng: lon,
          zoom: 12,
        },
      })
    );

    dispatch(changeLocationStatus(false));

    window.scrollTo(0, 0);

    setIsResultsOpen(false);
  };

  useEffect(() => {
    const fetchGeoData = async () => {
      let url = `https://geocode.maps.co/search?q=${geocoderValue}`;

      setIsGeocoderLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();

        setGeocoderResponse(data);
        setIsGeocoderLoading(false);
        setIsResultsOpen(true);
      } catch (err) {
        setIsGeocoderLoading(false);
      }
    };

    if (geocoderValue.length >= 3) {
      const timer = setTimeout(() => {
        fetchGeoData();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [geocoderValue]);

  return (
    <StyledGeocoderContainer ref={ref}>
      <Input
        placeholder="Search location"
        variant="search"
        value={geocoderValue}
        onChange={handleChangeGeocoder}
        loading={isGeocoderLoading ? 'true' : 'false'}
        onClick={handleClear}
        full="true"
      />
      {geocoderResponse && isResultsOpen && (
        <StyledGeocoderResultsContainer>
          {geocoderResponse.slice(0, 3).map((data: TGeoResponse, i) => {
            let { lat, lon, display_name } = data;
            return (
              <StyledGeocoderResult key={i}>
                <button
                  title={display_name}
                  onClick={() => handleResultSelect({ lat, lon })}
                >
                  {display_name}
                </button>
              </StyledGeocoderResult>
            );
          })}
        </StyledGeocoderResultsContainer>
      )}
    </StyledGeocoderContainer>
  );
};

export { Geocoder };
