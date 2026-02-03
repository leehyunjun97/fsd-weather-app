import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

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
