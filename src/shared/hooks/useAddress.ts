import { useQuery } from '@tanstack/react-query';
import { fetchLocationName } from '../api/weatherApi';

export const useAddress = (location: GeoLocation | null) => {
  return useQuery({
    queryKey: ['address', location?.lat, location?.lon],
    queryFn: () => fetchLocationName(location!),
    enabled: !!location,
    staleTime: Infinity,
  });
};
