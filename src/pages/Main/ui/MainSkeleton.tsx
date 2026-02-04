import { Skeleton } from '../../../shared/ui/Skeleton';

export const MainSkeleton = () => {
  return (
    <div className='flex flex-col gap-8 pb-10 w-full h-full'>
      <section className='flex flex-col items-center justify-center py-8 gap-4'>
        <Skeleton className='h-8 w-32' />
        <Skeleton className='h-32 w-32 rounded-full' />
        <Skeleton className='h-20 w-48' />
      </section>
    </div>
  );
};
