import { Skeleton } from '../../../shared/ui/Skeleton';

interface WeatherSkeletonProps {
  showFavorite?: boolean;
}

export default function WeatherSkeleton({
  showFavorite = false,
}: WeatherSkeletonProps) {
  return (
    <div className='relative flex flex-col gap-6 pb-10'>
      {showFavorite && (
        <div className='absolute top-0 right-4 z-20'>
          <Skeleton className='w-10 h-10 bg-gray-200 rounded-full' />
        </div>
      )}

      <section className='mt-4 flex flex-col items-center justify-center gap-2 py-4'>
        <Skeleton className='h-8 w-40 bg-gray-200 rounded-lg' />
        <Skeleton className='w-20 h-20 bg-gray-200 rounded-full my-2' />
        <Skeleton className='h-18 w-25 bg-gray-200 rounded-2xl' />
        <Skeleton className='h-8 w-24 bg-gray-200' />
        <Skeleton className='h-8 w-48 bg-gray-200' />
      </section>

      <section className='w-full overflow-hidden'>
        <div className='flex gap-3 px-1'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className='min-w-22 h-26 bg-gray-200 rounded-2xl'
            />
          ))}
        </div>
      </section>
    </div>
  );
}
