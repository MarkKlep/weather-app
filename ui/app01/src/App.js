import { useState, useContext } from 'react';
import './App.css';
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';
import ForecastWeather from './components/forecats-weather/ForecastWeather';
import { CURRENT_WEATHER_URL, API_KEY } from './components/api';
import { AuthContext } from './components/provider/AuthProvider';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const { user } = useContext(AuthContext);

  const handleOnSearchChange = (searchData) => {

    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(`${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

    const forecastWeatherFetch = fetch(`${CURRENT_WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
    .then(async res => {
      const currentWeatherRes = await res[0].json();
      const forecastWeatherRes = await res[1].json();
      setCurrentWeather({city: searchData.label, ...currentWeatherRes});
      setForecastWeather({city: searchData.label, ...forecastWeatherRes});
    })

  }

  return (
    <div className="container">

      <Search onSerachChange={handleOnSearchChange}/>

      <div>
        {currentWeather && <CurrentWeather data={currentWeather}/>}
      </div>

      <div>
        {forecastWeather && <ForecastWeather data={forecastWeather} />}
      </div>
    </div>
  );
}

export default App;
