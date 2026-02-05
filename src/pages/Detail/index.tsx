import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCoordinates } from '../../shared/api/weatherApi';
import { ErrorState } from '../Main/ui/ErrorState';
import { useWeather } from '../../shared/hooks/useWeather';
import { CurrentWeatherCard } from '../../entities/weather/ui/CurrentWeatherCard';
import { HourlyWeatherRow } from '../../entities/weather/ui/HourlyWeatherRow';
import { Star } from 'lucide-react';
import WeatherSkeleton from '../../entities/weather/ui/WeatherSkeleton';
import { useFavoriteAction } from '../../features/favorites/model/useFavoriteAction';

export default function DetailPage() {
  const { locationName } = useParams<{ locationName: string }>();
  const formattedLocationName = locationName?.replace(/-/g, ' ');
  const locationState = useLocation().state as GeoLocation | null;
  const [coords, setCoords] = useState<GeoLocation | null>(locationState);
  const [isLoadingCoords, setIsLoadingCoords] = useState(false);

  const { isFavorite, toggleFavorite } = useFavoriteAction(
    formattedLocationName,
    coords
  );

  useEffect(() => {
    const resolveCoords = async () => {
      if (locationState) {
        setCoords(locationState);
        return;
      }

      if (formattedLocationName) {
        setIsLoadingCoords(true);

        const fetchedCoords = await fetchCoordinates(formattedLocationName);

        if (fetchedCoords) {
          setCoords(fetchedCoords);
        } else {
          setCoords(null);
        }
        setIsLoadingCoords(false);
      }
    };

    resolveCoords();
  }, [formattedLocationName, locationState]);

  const {
    data: weatherData,
    error,
    isLoading: isWeatherLoading,
    refetch,
  } = useWeather(coords);

  if (isLoadingCoords || isWeatherLoading)
    return <WeatherSkeleton showFavorite={true} />;
  if (error || !weatherData || (!coords && !isLoadingCoords)) {
    return <ErrorState message={formattedLocationName} onRetry={refetch} />;
  }

  return (
    <div className='relative flex flex-col gap-6 pb-10 animate-in fade-in duration-700'>
      <button
        onClick={toggleFavorite}
        className='absolute top-0 right-4 z-20 p-2 outline-none cursor-pointer'
        aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      >
        <Star
          size={30}
          className={'transition-colors text-yellow-400'}
          fill={isFavorite ? 'currentColor' : 'none'}
        />
      </button>

      <section className='mt-4'>
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
