export const FavoritesEmpty = () => {
  return (
    <div className='flex flex-col items-center flex-1 gap-6 pt-32 text-gray-400 animate-in fade-in zoom-in duration-500'>
      <div className='text-7xl opacity-50'>🌩️</div>
      <p className='text-lg'>저장된 즐겨찾기 목록이 없습니다.</p>
    </div>
  );
};
