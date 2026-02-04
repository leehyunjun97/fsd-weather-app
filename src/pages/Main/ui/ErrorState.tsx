import { useNavigate } from 'react-router-dom';

interface Props {
  message?: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: Props) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-[35vh] gap-5 text-center px-4'>
      <div className='text-5xl'>☁️</div>
      <h2 className='text-xl font-bold text-gray-800'>
        해당 장소의 정보가 제공되지 않습니다.
      </h2>
      <p className='text-gray-600 text-sm max-w-xs break-keep'>
        {message || '네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.'}
      </p>
      <div className='flex gap-2'>
        <button
          onClick={() => navigate('/')}
          className='mt-4 px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer'
        >
          홈으로
        </button>
        <button
          onClick={onRetry}
          className='mt-4 px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer'
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
};
