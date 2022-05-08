import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';

export default function App() {

  
  const [weather, setWeather] = useState({});
  const [celsius, setCelsius] = useState(0);
  const [isCelsius, setIsCelsius] = useState(true);
  
  
  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;
      axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d25c8efe3241bd9b74963870e1b5cccf`
        )
        .then((res) => {
          setWeather(res.data);
          setCelsius((res.data.main.temp - 273.15).toFixed(2));
        });
      }
      
      function error(err) {
        alert('El usuario no permitió el acceso a la ubicación');
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  console.log(weather)
  
  const changeUnit = () => {
    if (isCelsius) {
      // This is the convertion to meter
      setCelsius((((celsius - 32) * 5) / 9).toFixed(2));
      setIsCelsius(false);
    }
    //This is the convertion to decimeter
    else {
      setCelsius((weather.main?.temp - 273.15).toFixed(2));
      setIsCelsius(true);
    }
  };
  
  return (
    <div backgroundImage={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}>
      <spinner color="primary"/>
      <div className="date-container">
        <div>
          <h1 className="title">Weather App</h1>
          <h2 className="city">
            {weather.name}, {weather.sys?.country}
          </h2>
          <div className="image">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div className="options">
            <h3>"{weather.weather?.[0].description}"</h3>
            <h3>
              {' '}
              Pressure: {(weather.main?.pressure * 0.000987).toFixed(2)} atm
            </h3>
            <h3>
              {' '}
              Thermal Sensation:{' '}
              {(weather.main?.feels_like - 273.15).toFixed(2)} °C
            </h3>
            <h3> Wind: {weather.wind?.speed} m/s</h3>
          </div>
          <h2 className="temperature">{celsius} {isCelsius ? '°C' : '°F'}</h2>
          <button className="button" onClick={changeUnit}>
            <b>Alternate °C/°F</b>
          </button>
        </div>
      </div>
    </div>
  );
}

