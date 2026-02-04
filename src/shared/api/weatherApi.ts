import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;
const GEO_URL = import.meta.env.VITE_GEO_API_URL;
const KAKAO_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const KAKAO_SEARCH_URL = import.meta.env.VITE_KAKAO_SEARCH_API_URL;

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

export const fetchCoordinates = async (
  query: string
): Promise<GeoLocation | null> => {
  try {
    const response = await axios.get(KAKAO_SEARCH_URL, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_KEY}`,
      },
      params: {
        query,
        size: 1,
      },
    });

    if (response.data.documents && response.data.documents.length > 0) {
      const { x, y } = response.data.documents[0];

      return {
        lat: parseFloat(y),
        lon: parseFloat(x),
      };
    }

    return null;
  } catch (error) {
    console.error('좌표 변환 실패 (카카오):', error);
    return null;
  }
};
