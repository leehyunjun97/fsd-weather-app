import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/weatherApi';

export const useWeather = (location: GeoLocation | null) => {
  return useQuery({
    queryKey: ['weather', location?.lat, location?.lon],
    queryFn: () => fetchWeather(location!),
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
  });
};
