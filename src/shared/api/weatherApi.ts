import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;
const GEO_URL = import.meta.env.VITE_GEO_API_URL;

export const fetchWeather = async ({
  lat,
  lon,
}: GeoLocation): Promise<OneCallWeatherData> => {
  const response = await axios.get(`${BASE_URL}/onecall`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
      exclude: 'minutely,alerts',
    },
  });
  return response.data;
};

export const fetchLocationName = async ({
  lat,
  lon,
}: GeoLocation): Promise<string> => {
  try {
    const response = await axios.get(GEO_URL, {
      params: {
        lat,
        lon,
        limit: 1,
        appid: API_KEY,
      },
    });

    if (response.data && response.data.length > 0) {
      const { local_names, name } = response.data[0];
      return local_names?.ko || name;
    }
    return '알 수 없는 지역';
  } catch (error) {
    console.error('주소 변환 실패:', error);
    return '나의 위치';
  }
};
