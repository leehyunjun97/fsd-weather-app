import { useEffect } from 'react';
import { useCurrentLocation } from '../../shared/hooks/useCurrentLocation';
import { useWeather } from '../../shared/hooks/useWeather';

export default function MainPage() {
  const {
    location,
    error: locationError,
    isLoading: locationLoading,
  } = useCurrentLocation();
  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
  } = useWeather(location);

  useEffect(() => {
    if (location) {
      console.log('현재 위치 좌표:', location);
    }
    if (weatherData) {
      console.log('날씨 데이터:', weatherData);
    }
    if (locationError) {
      console.error('위치 에러:', locationError);
    }
    if (weatherError) {
      console.error('날씨 API 에러:', weatherError);
    }
  }, [location, weatherData, locationError, weatherError]);

  return (
    <>
      <h1>MainPage Component</h1>
    </>
  );
}
