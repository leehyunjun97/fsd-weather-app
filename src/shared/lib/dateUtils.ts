export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
  }).format(date);
};

export const formatDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth()
  ) {
    return '오늘';
  }
  return new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(date);
};
