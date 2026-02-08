import { useState, useEffect } from 'react';

interface UseCurrentLocationResult {
  location: GeoLocation | null;
  error: string | null;
  isLoading: boolean;
}

export const useCurrentLocation = (): UseCurrentLocationResult => {
  const isSupported =
    typeof navigator !== 'undefined' && 'geolocation' in navigator;
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<string | null>(
    isSupported ? null : '위치 정보를 사용할 수 없는 브라우저입니다.'
  );
  const [isLoading, setIsLoading] = useState<boolean>(isSupported);

  useEffect(() => {
    if (!isSupported) return;

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lon: longitude });
      setIsLoading(false);
    };

    const handleError = (err: GeolocationPositionError) => {
      setError(err.message);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  }, [isSupported]);

  return { location, error, isLoading };
};
