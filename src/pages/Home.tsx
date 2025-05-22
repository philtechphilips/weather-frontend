// Home page: shows weather for popular cities and search bar
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import toast, { Toaster } from "react-hot-toast";
import Input from "../components/Input";
import { fetchPopularCitiesWeather } from "../api/weatherApi";
import WeatherCard from "../components/WeatherCard";

const POPULAR_CITIES = [
  "London",
  "New York",
  "Tokyo",
  "Paris",
  "Sydney",
  "Ibadan",
  "Cairo",
  "Moscow",
];

const Home: React.FC = () => {
  const [weatherList, setWeatherList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchPopularCitiesWeather(POPULAR_CITIES);
        setWeatherList(data);
      } catch (error: any) {
        console.error(error);
        toast.error(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch weather data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      toast.error("Please enter a location!");
      return;
    }
    navigate(`/weather/${encodeURIComponent(search.trim())}`);
  };
  return (
    <div className="flex flex-col relative md:h-screen w-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center md:px-25 py-10 px-5">
      <div className="z-1">
        <h1 className="text-white text-xl font-semibold">Weather App</h1>
      </div>

      <div className="flex flex-col items-center w-full justify-center h-60 z-10">
        <form onSubmit={handleSearch} className="flex w-full items-center justify-center gap-2 mb-6">
          <div className="relative md:w-120 w-full">
            <button
              type="submit"
              className="absolute left-3 top-[35%] -translate-y-1/2 text-gray-900 text-xl"
            >
              <i className="ri-search-2-line" />
            </button>
            <Input
              placeholder="Search your address, country or zipcode"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#f3f3f3] rounded shadow-md pl-10 pr-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none w-full"
            />
          </div>
        </form>
      </div>

      <div className="z-10 flex flex-col items-center">
        <h2 className="text-white mb-4 text-left">
          Popular Cities
        </h2>
        <div className="lg:w-320 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="text-white text-center">Loading...</div>
          ) : (
            weatherList.map((weather, index) => (
              <WeatherCard
                key={index}
                name={weather?.name}
                temp={weather?.temp}
                desc={weather?.desc}
                country={weather?.country}
              />
            ))
          )}
        </div>
      </div>

      <div className="bg-black/40 fixed top-0 left-0 z-0 w-full h-screen"></div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#efefef",
            color: "#333",
          },
        }}
      />
    </div>
  );
};

export default Home;
