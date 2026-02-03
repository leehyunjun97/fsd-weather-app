interface GeoLocation {
  lat: number;
  lon: number;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CurrentWeather {
  dt: number;
  temp: number;
  weather: WeatherCondition[];
}

interface HourlyWeather {
  dt: number;
  temp: number;
  x;
  weather: WeatherCondition[];
}

interface DailyWeather {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: WeatherCondition[];
}

interface OneCallWeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}
