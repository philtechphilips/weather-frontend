import axios from 'axios';

const API_URL = 'https://wttr.in';

export const fetchWeather = async (location: string) => {
  try {
    const res = await axios.get(`${API_URL}/${encodeURIComponent(location)}?format=j1`);
    console.log('Weather data:', res.data);
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
        console.log(`Weather data for ${city}:`, data);
        return {
          name: city,
          temp: data?.current_condition?.[0]?.temp_C ?? null,
          desc: data?.current_condition?.[0]?.weatherDesc[0]?.value ?? null,
          country: data?.nearest_area?.[0]?.country?.[0]?.value ?? null,
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
