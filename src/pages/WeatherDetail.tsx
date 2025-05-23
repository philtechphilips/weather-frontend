// Weather detail page: shows yesterday, today, and tomorrow's forecast for a location
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WeatherCard from "../components/WeatherCard";
import { fetchForecast } from "../api/weatherApi";
import axios from "axios";

const WeatherDetail: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  const [weather, setWeather] = useState<any>(null);
  const [yesterday, setYesterday] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    // Get yesterday's date in YYYY-MM-DD
    const today = new Date();
    const yesterdayDate = new Date(today);
    yesterdayDate.setDate(today.getDate() - 1);
    const yyyy = yesterdayDate.getFullYear();
    const mm = String(yesterdayDate.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterdayDate.getDate()).padStart(2, '0');
    const yestStr = `${yyyy}-${mm}-${dd}`;

    // Fetch yesterday's weather
    axios.get(`https://api.weatherapi.com/v1/history.json`, {
      params: {
        key: import.meta.env.VITE_WEATHER_API_KEY,
        q: location,
        dt: yestStr,
      },
    })
      .then(res => {
        setYesterday(res.data);
      })
      .catch(() => setYesterday(null))
      .finally(() => {
        // Fetch forecast for today and tomorrow
        fetchForecast(location, 2)
          .then(data => {
            setWeather(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, [location]);

  const getDayLabel = (idx: number) => {
    if (idx === 0) return 'Yesterday';
    if (idx === 1) return 'Today';
    if (idx === 2) return 'Tomorrow';
    return '';
  };

  // Merge yesterday, today, tomorrow data for display
  const mergedDays = [];
  if (yesterday && yesterday.forecast && yesterday.forecast.forecastday[0]) {
    mergedDays.push(yesterday.forecast.forecastday[0]);
  }
  if (weather && weather.forecast && weather.forecast.forecastday) {
    mergedDays.push(...weather.forecast.forecastday);
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      <button
        className="mb-6 px-4 py-2 bg-white bg-opacity-80 rounded shadow hover:bg-opacity-100 transition font-semibold cursor-pointer"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <div className="max-w-3xl w-full p-4 bg-opacity-80 rounded-lg">
        <h1 className="text-xl mb-4 text-center text-white">Weather in {location}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-center">
          {loading ? (
            <p>Loading...</p>
          ) : mergedDays.length === 3 ? (
            mergedDays.map((day: any, idx: number) => (
              <WeatherCard
                key={idx}
                name={getDayLabel(idx)}
                temp={day?.day?.avgtemp_c}
                desc={day?.day?.condition?.text}
                country={weather?.location?.country || yesterday?.location?.country}
              />
            ))
          ) : (
            <p>No data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
