import { useState, useEffect } from 'react';
import { fetchCoordinates } from '../../../shared/api/weatherApi';

export const useResolvedCoords = (
  locationName: string | undefined,
  locationState: GeoLocation | null
) => {
  const [coords, setCoords] = useState<GeoLocation | null>(locationState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formattedLocationName = locationName?.replace(/-/g, ' ');

  useEffect(() => {
    const resolve = async () => {
      setErrorMessage(null);

      if (locationState) {
        setCoords(locationState);
        return;
      }

      if (formattedLocationName) {
        setIsLoading(true);
        const fetched = await fetchCoordinates(formattedLocationName);

        if (fetched) {
          setCoords(fetched);
        } else {
          setCoords(null);
          setErrorMessage(`'${formattedLocationName}'을(를) 찾을 수 없습니다.`);
        }
        setIsLoading(false);
      }
    };

    resolve();
  }, [formattedLocationName, locationState]);

  return { coords, isLoading, errorMessage, formattedLocationName };
};
