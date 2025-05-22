// Weather detail page: shows yesterday, today, and tomorrow's forecast for a location
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WeatherCard from "../components/WeatherCard";
import { fetchForecast } from "../api/weatherApi";

const WeatherDetail: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    fetchForecast(location, 3)
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [location]);

  const getDayLabel = (idx: number) => {
    if (idx === 0) return 'Today';
    if (idx === 1) return 'Tomorrow';
    return weather && weather.forecast && weather.forecast.forecastday[idx] ? weather.forecast.forecastday[idx].date : '';
  };

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
          ) : weather && weather.forecast ? (
            weather.forecast.forecastday.slice(0, 3).map((day: any, idx: number) => (
              <WeatherCard
                key={idx}
                name={getDayLabel(idx)}
                temp={day?.day?.avgtemp_c}
                desc={day?.day?.condition?.text}
                country={weather?.location?.country}
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
