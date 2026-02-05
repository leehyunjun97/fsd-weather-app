import { getWeatherDescription } from '../../../shared/lib/weatherTranslator';

interface CurrentWeatherCardProps {
  current: CurrentWeather;
  today: DailyWeather;
  locationName: string;
}

export const CurrentWeatherCard = ({
  current,
  today,
  locationName,
}: CurrentWeatherCardProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;

  return (
    <div className='flex flex-col items-center justify-center py-4 md:py-8 text-gray-800'>
      <h2 className='text-xl md:text-2xl font-semibold tracking-tight mb-1'>
        {locationName}
      </h2>

      <div className='relative w-24 h-24 md:w-32 md:h-32 -my-2 md:-my-4'>
        <img
          src={iconUrl}
          alt={getWeatherDescription(current.weather[0].id)}
          className='w-full h-full object-contain drop-shadow-md'
        />
      </div>

      <div className='text-5xl md:text-7xl tracking-tighter mb-2'>
        {Math.round(current.temp)}°
      </div>

      <p className='text-lg md:text-xl font-medium text-gray-600 mb-2'>
        {getWeatherDescription(current.weather[0].id)}
      </p>

      <div className='flex gap-2 md:gap-3 text-base md:text-lg font-medium text-gray-500'>
        <span>최고: {Math.round(today.temp.max)}°</span>
        <span>|</span>
        <span>최저: {Math.round(today.temp.min)}°</span>
      </div>
    </div>
  );
};
