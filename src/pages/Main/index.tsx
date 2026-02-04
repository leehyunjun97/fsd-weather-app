import { CurrentWeatherCard } from '../../entities/weather/ui/CurrentWeatherCard';
import { HourlyWeatherRow } from '../../entities/weather/ui/HourlyWeatherRow';
import WeatherSkeleton from '../../entities/weather/ui/WeatherSkeleton';
import { useAddress } from '../../shared/hooks/useAddress';
import { useCurrentLocation } from '../../shared/hooks/useCurrentLocation';
import { useWeather } from '../../shared/hooks/useWeather';
import { ErrorState } from './ui/ErrorState';

export default function MainPage() {
  const {
    location,
    error: locError,
    isLoading: locLoading,
  } = useCurrentLocation();

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
    refetch,
  } = useWeather(location);

  const { data: address } = useAddress(location);

  if (locLoading || weatherLoading) {
    return <WeatherSkeleton />;
  }

  const errorMessage = locError || (weatherError as Error)?.message;
  if (errorMessage || !weatherData) {
    return (
      <ErrorState
        message={errorMessage || '해당 장소의 정보가 제공되지 않습니다.'}
        onRetry={() => {
          if (locError) window.location.reload();
          else refetch();
        }}
      />
    );
  }

  return (
    <div className='flex flex-col gap-6 pb-10 animate-in fade-in duration-700'>
      <section>
        <CurrentWeatherCard
          current={weatherData.current}
          today={weatherData.daily[0]}
          locationName={address || '위치 확인 중...'}
        />
      </section>

      <section>
        <HourlyWeatherRow data={weatherData.hourly} />
      </section>
    </div>
  );
}
