import axios from 'axios';

const API_URL = 'https://api.weatherapi.com/v1';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (location: string) => {
  try {
    const res = await axios.get(`${API_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: location,
        aqi: 'no',
      },
    });
    console.log('WeatherAPI data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const fetchPopularCitiesWeather = async (cities: string[]) => {
  const results = await Promise.all(
    cities.map(async (city) => {
      try {
        const data = await fetchWeather(city);
        return {
          name: data.location.name,
          temp: data.current.temp_c,
          desc: data.current.condition.text,
          country: data.location.country,
          error: null,
        };
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
        return {
          name: city,
          temp: null,
          desc: null,
          country: null,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    })
  );

  return results;
};

export const fetchForecast = async (location: string, days: number = 3) => {
  try {
    const res = await axios.get(`${API_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days,
        aqi: 'no',
        alerts: 'no',
      },
    });
    console.log('WeatherAPI forecast data:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const fetchCitySuggestions = async (search: string) => {
  const API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
  const API_HEADERS = {
    "X-RapidAPI-Key": import.meta.env.VITE_CITY_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
  };
  try {
    const response = await fetch(`${API_URL}?namePrefix=${encodeURIComponent(search.trim())}&limit=7&sort=-population`, {
      headers: API_HEADERS
    });
    const data = await response.json();
    return data.data?.map((city: any) => `${city.city}, ${city.country}`) || [];
  } catch (err) {
    return [];
  }
};
