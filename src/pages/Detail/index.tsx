import { useLocation, useParams } from 'react-router-dom';
import { ErrorState } from '../Main/ui/ErrorState';
import { useWeather } from '../../shared/hooks/useWeather';
import { CurrentWeatherCard } from '../../entities/weather/ui/CurrentWeatherCard';
import { HourlyWeatherRow } from '../../entities/weather/ui/HourlyWeatherRow';
import WeatherSkeleton from '../../entities/weather/ui/WeatherSkeleton';
import { useResolvedCoords } from './model/useResolvedCoords';
import { AddToFavoriteButton } from '../../features/favorites/ui/AddToFavoriteButton';

export default function DetailPage() {
  const { locationName } = useParams<{ locationName: string }>();
  const locationState = useLocation().state as GeoLocation | null;

  const {
    coords,
    isLoading: isLoadingCoords,
    errorMessage,
    formattedLocationName,
  } = useResolvedCoords(locationName, locationState);

  const {
    data: weatherData,
    error,
    isLoading: isWeatherLoading,
    refetch,
  } = useWeather(coords);

  if (isLoadingCoords || isWeatherLoading)
    return <WeatherSkeleton showFavorite={true} />;

  if (errorMessage || error || !weatherData || (!coords && !isLoadingCoords)) {
    return <ErrorState message={formattedLocationName} onRetry={refetch} />;
  }

  return (
    <div className='relative flex flex-col gap-6 pb-10 animate-in fade-in duration-700'>
      <AddToFavoriteButton
        locationName={formattedLocationName}
        coords={coords}
      />

      <section className='mt-10 md:mt-4'>
        <CurrentWeatherCard
          current={weatherData.current}
          today={weatherData.daily[0]}
          locationName={
            formattedLocationName || '해당 장소의 정보가 제공되지 않습니다.'
          }
        />
      </section>

      <section>
        <HourlyWeatherRow data={weatherData.hourly} />
      </section>
    </div>
  );
}
