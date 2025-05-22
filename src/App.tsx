import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/Notfound';
import WeatherDetail from './pages/WeatherDetail';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:location" element={<WeatherDetail />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router>
  );
}

export default App;
