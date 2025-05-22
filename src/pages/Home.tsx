// Home page: shows weather for popular cities and search bar
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import toast, { Toaster } from "react-hot-toast";
import Input from "../components/Input";
import { fetchPopularCitiesWeather, fetchCitySuggestions } from "../api/weatherApi";
import WeatherCard from "../components/WeatherCard";

const POPULAR_CITIES = [
  "London",
  "New York",
  "Tokyo",
  "Paris",
  "Sydney",
  "Los Angeles",
  "Berlin",
  "Toronto",
  "Lagos",
  "Ibadan",
  "Cairo",
  "Moscow",
];

const Home: React.FC = () => {
  const [weatherList, setWeatherList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const debounceTimeout = useRef<number | null>(null);

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

  // Autocomplete logic using GeoDB Cities API
  useEffect(() => {
    if (search.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    setSuggestionLoading(true);
    debounceTimeout.current = window.setTimeout(async () => {
      try {
        const cities = await fetchCitySuggestions(search);
        setSuggestions(cities);
        setShowSuggestions(cities.length > 0);
      } catch (err) {
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setSuggestionLoading(false);
      }
    }, 400);
    
  }, [search]);

  // Hide suggestions on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSuggestionClick = (city: string) => {
    setSearch(city);
    setShowSuggestions(false);
    navigate(`/weather/${encodeURIComponent(city)}`);
  };

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
      <div className="z-1 flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">Weather App</h1>
        <a
          href="/chat"
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow transition-colors duration-150 text-sm font-medium"
        >
          Go to Chat
        </a>
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
              autoComplete="off"
            />
            {showSuggestions && (
              <ul className="absolute left-0 right-0 mt-1 bg-white rounded shadow-lg z-20 max-h-48 overflow-y-auto">
                {suggestionLoading && (
                  <li className="px-4 py-2 text-gray-500 text-sm">Loading...</li>
                )}
                {suggestions.map((city) => (
                  <li
                    key={city}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800 text-sm"
                    onClick={() => handleSuggestionClick(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
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
                onClick={() => navigate(`/weather/${encodeURIComponent(weather?.name)}`)}
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
