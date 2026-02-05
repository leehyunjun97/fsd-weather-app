export const getWeatherGradient = (weatherId?: number) => {
  if (!weatherId) return 'bg-gradient-to-br from-gray-300 to-gray-400';
  if (weatherId === 800) {
    return 'bg-gradient-to-br from-slate-300 to-slate-400';
  }
  if (weatherId >= 801) {
    return 'bg-gradient-to-br from-slate-400 to-slate-500';
  }
  if (weatherId >= 500 && weatherId < 600) {
    return 'bg-gradient-to-br from-slate-500 to-slate-600';
  }
  if (weatherId >= 200 && weatherId < 300) {
    return 'bg-gradient-to-br from-slate-600 to-slate-800';
  }
  if (weatherId >= 600 && weatherId < 700) {
    return 'bg-gradient-to-br from-gray-200 to-slate-300 text-slate-700';
  }

  if (weatherId >= 700 && weatherId < 800) {
    return 'bg-gradient-to-br from-slate-400 to-gray-400';
  }
  return 'bg-gradient-to-br from-slate-300 to-slate-400';
};
