import { useDraggable } from '../../../shared/hooks/useDraggable';
import { formatTime } from '../../../shared/lib/dateUtils';

interface HourlyWeatherRowProps {
  data: HourlyWeather[];
}

export const HourlyWeatherRow = ({ data }: HourlyWeatherRowProps) => {
  const { scrollRef, events } = useDraggable();
  return (
    <div className='w-full'>
      <div
        className='flex gap-3 overflow-x-auto pb-4 px-1 scrollbar-hover cursor-grab active:cursor-grabbing'
        ref={scrollRef}
        {...events}
      >
        {data.map((item, index) => (
          <div
            key={item.dt}
            className={`
              select-none 
              flex flex-col items-center justify-between
              min-w-22 p-3 rounded-2xl
              border border-white/50 shadow-sm
              backdrop-blur-md bg-white/40
              transition-all duration-200
              ${index === 0 ? 'bg-white/60 font-medium' : ''} 
            `}
          >
            <span className={'text-xs mb-1 text-gray-600'}>
              {index === 0 ? '지금' : formatTime(item.dt)}
            </span>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt='아이콘'
              draggable={false}
              className='w-10 h-10 drop-shadow-sm'
            />

            <span className='text-lg font-bold text-gray-800'>
              {Math.round(item.temp)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
