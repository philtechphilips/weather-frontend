interface WeatherCardProps {
  name: string;
  temp: number;
  desc: string;
  country: string;
  onClick?: () => void;
}

const getWeatherIcon = (desc: string) => {
  const d = desc?.toLowerCase();
  if (d && d.includes("cloud")) return <i className="ri-cloudy-2-line text-4xl text-white" title="Cloudy" />;
  if (d && d.includes("rain")) return <i className="ri-rainy-line text-4xl text-white" title="Rainy" />;
  if (d && d.includes("clear") || d.includes("sunny")) return <i className="ri-sun-line text-4xl text-white" title="Sunny" />;
  if (d && d.includes("storm")) return <i className="ri-thunderstorms-line text-4xl text-white" title="Storm" />;
  if (d && d.includes("snow")) return <i className="ri-snowy-line text-4xl text-white" title="Snow" />;
  if (d && d.includes("fog") || d.includes("mist")) return <i className="ri-foggy-line text-4xl text-white" title="Foggy" />;
  if (d && d.includes("overcast")) return <i className="ri-cloud-windy-line text-4xl text-white" title="Overcast" />;
  return <i className="ri-weather-line text-4xl text-white" title="Weather" />;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ name, temp, desc, country, onClick }) => {
  return (
    <div className="bg-black/40 rounded-lg shadow-md p-4 flex flex-col gap-2 cursor-pointer hover:bg-black/60 transition" onClick={onClick}>
      <h3 className="text-xl text-white mt-2">{name}</h3>
      <p className="text-sm text-white">{country}</p>
      <div className="flex items-center gap-2">
        {getWeatherIcon(desc)}
        <p className="text-white text-2xl">{temp}°C</p>
      </div>
      <p className="text-[#f0f0f0] text-sm capitalize">{desc}</p>
    </div>
  );
};

export default WeatherCard;