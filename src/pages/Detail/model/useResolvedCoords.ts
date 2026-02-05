import { useQuery } from '@tanstack/react-query';
import { fetchCoordinates } from '../../../shared/api/weatherApi';

export const useResolvedCoords = (
  locationName: string | undefined,
  locationState: GeoLocation | null
) => {
  const formattedLocationName = locationName?.replace(/-/g, ' ');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['coords', formattedLocationName],
    queryFn: () => fetchCoordinates(formattedLocationName!),
    enabled: !!formattedLocationName && !locationState,
    initialData: locationState || undefined,
    staleTime: Infinity,
    retry: 1,
  });

  return {
    coords: data || null,
    isLoading,
    errorMessage: isError ? formattedLocationName : null,
    formattedLocationName,
  };
};
