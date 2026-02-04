export const getWeatherDescription = (id: number): string => {
  if (id >= 200 && id < 300) {
    return '천둥번개';
  }

  if (id >= 300 && id < 400) {
    return '이슬비';
  }

  if (id >= 500 && id < 600) {
    if (id <= 504) return '비';
    if (id === 511) return '우박';
    return '소나기';
  }

  if (id >= 600 && id < 700) {
    if (id >= 611 && id <= 616) return '진눈깨비';
    return '눈';
  }

  if (id >= 700 && id < 800) {
    if (id === 711) return '미세먼지';
    if (id === 731 || id === 761) return '황사';
    if (id === 781) return '태풍';
    return '안개';
  }

  if (id === 800) {
    return '맑음';
  }

  if (id > 800) {
    if (id === 801) return '구름 조금';
    if (id === 802) return '구름 낌';
    if (id === 803) return '구름 많음';
    return '흐림';
  }

  return '정보 없음';
};
