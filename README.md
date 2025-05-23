# Weather App

A modern weather application built with React, TypeScript, and Vite. It provides real-time weather information, city search with autocomplete, and a chat interface for weather queries. The app features a beautiful UI and smooth navigation.

**Live Demo:** [https://weather-frontend-six-ivory.vercel.app/](https://weather-frontend-six-ivory.vercel.app/)

## Features & Pages

### Home Page (`/`)
- View weather for popular cities at a glance.
- Search for any city, country, or zipcode with autocomplete suggestions.
- Click a city to view detailed weather.
- Quick link to the Chat page.

### Weather Detail Page (`/weather/:location`)
- Shows detailed weather for the selected location.
- Displays weather for yesterday, today, and tomorrow.
- Includes temperature, weather description, and country.
- Easy navigation back to the previous page.

### Chat Page (`/chat`)
- Chatbot interface to ask about the weather in any city.
- Type natural language questions (e.g., "What's the weather in Paris?").
- The bot extracts the city and provides a direct link to its weather details.

### Not Found Page
- Friendly 404 page for undefined routes.

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd weather-app
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
   If you encounter issues with peer dependencies (especially on Node.js less than v20), use:
   ```sh
   npm install --legacy-peer-deps
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```

## API Keys Setup

To use this app, you need API keys for weather data and city autocomplete. Create a `.env` file in the project root (see `.env.example` for the format):

### 1. Weather API Key
- Go to [https://www.weatherapi.com/](https://www.weatherapi.com/)
- Sign up for a free account.
- After verifying your email, log in and go to your account dashboard.
- Copy your API key from the dashboard.
- Add it to your `.env` file as:
  ```env
  VITE_WEATHER_API_KEY=your_weatherapi_key_here
  ```

### 2. City Autocomplete API Key
- Go to [https://rapidapi.com/](https://rapidapi.com/)
- Sign up or log in.
- Search for "GeoDB Cities API" and subscribe to the free plan.
- Go to the "Endpoints" tab and copy your `X-RapidAPI-Key` from the code snippets.
- Add it to your `.env` file as:
  ```env
  VITE_CITY_API_KEY=your_rapidapi_key_here
  ```

## Dependencies
- [React](https://react.dev/) & [React DOM](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/) (for styling)
- [remixicon](https://remixicon.com/) (for icons)
- [react-router-dom](https://reactrouter.com/) (for routing)
- [react-hot-toast](https://react-hot-toast.com/) (for notifications)
- [axios](https://axios-http.com/) (for API requests)

## Notes
- Requires Node.js v20 or later.
- API keys for weather and city autocomplete are required (see instructions above).
- The UI is fully responsive and works on all modern browsers.

---

Feel free to contribute or open issues for suggestions and improvements!
