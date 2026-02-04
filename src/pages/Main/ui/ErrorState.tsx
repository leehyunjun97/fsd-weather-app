interface Props {
  message?: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-4'>
      <div className='text-5xl'>😵</div>
      <h2 className='text-xl font-bold text-gray-800'>
        날씨를 불러오지 못했어요
      </h2>
      <p className='text-gray-500 text-sm max-w-xs break-keep'>
        {message || '네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.'}
      </p>
      <button
        onClick={onRetry}
        className='mt-4 px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors'
      >
        다시 시도하기
      </button>
    </div>
  );
};
