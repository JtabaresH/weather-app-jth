import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import RingLoader from "react-spinners/RingLoader";
import './App.css';

export default function App() {
  const [weather, setWeather] = useState({});
  const [celsius, setCelsius] = useState(0);
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);
  const weatherBackground = `${weather.weather?.[0].main}`
  const [changeBackground, setChangeBackground] = useState(weatherBackground);
      /* Cambios de fondos segun clima */
        if(changeBackground === "Rain"){
          setChangeBackground(document.body.style.background="url('https://previews.123rf.com/images/pohodka/pohodka1807/pohodka180700037/108184654-raindrops-on-the-glass-and-storm-clouds-in-the-background-rainy-weather-forecast-.jpg') no-repeat")
        } else if(changeBackground === "Clouds"){
          setChangeBackground(document.body.style.background="url('https://thumbs.dreamstime.com/b/clouds-overcast-sky-view-climate-environment-weather-concept-sky-background-overcast-sky-background-clouds-170172058.jpg') no-repeat")
        } else if (changeBackground === "Clear"){
          setChangeBackground(document.body.style.background="url('https://thumbs.dreamstime.com/b/clear-sky-sun-sunrays-daytime-good-weather-138115265.jpg') no-repeat")
        }
      /* Finaliza cambios de fondos */
    useEffect(() => {
        setLoading(true);
         setTimeout(() => {
            setLoading(false);
         }, 6000)
    }, []);
  
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
          setChangeBackground(res.data.weather?.[0].main)
          console.log(res.data.weather)
        });
      }
      
      function error(err) {
        alert('El usuario no permitió el acceso a la ubicación');
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  
  const changeUnit = () => {
    if (isCelsius) {
      // This is the convertion to Fahrenheit
      setCelsius(((celsius * 9/5) +32).toFixed(2));
      setIsCelsius(false);
    }
    //This is the convertion to decimeter
    else {
      setCelsius((weather.main?.temp - 273.15).toFixed(2));
      setIsCelsius(true);
    }
  };
  
  return (
    <div className="loader">
      {
        loading ? 
        <RingLoader size={150} color={"#123abc"} loading={loading} speedMultiplier={2} />
        :

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
            <button className="button" onClick={changeUnit} style={{cursor: 'pointer'}}>
              <b>Alternate °C/°F</b>
            </button>
          </div>
        </div>
      }
    </div>
  );
}

