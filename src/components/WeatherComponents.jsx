import { useEffect, useRef, useState } from "react";

import clear_icon from "../assets/img/icon/clear.png";
import clear_night_icon from "../assets/img/icon/clear-night.png";
import few_clouds_icon from "../assets/img/icon/few-clouds.png";
import few_night_clouds_icon from "../assets/img/icon/few-clouds-night.png";
import scattered_clouds_icon from "../assets/img/icon/scattered-clouds.png";
import broken_clouds_icon from "../assets/img/icon/broken-clouds.png";
import shower_rain_icon from "../assets/img/icon/shower-rain.png";
import rain_icon from "../assets/img/icon/rain.png";
import thunderstorm_icon from "../assets/img/icon/thunderstorm.png";
import snow_icon from "../assets/img/icon/snow.png";

// Style
import "../style/weather.css";

const WeatherComponents = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const allIcon = {
    "01d": clear_icon,
    "01n": clear_night_icon,
    "02d": few_clouds_icon,
    "02n": few_night_clouds_icon,
    "03d": scattered_clouds_icon,
    "03n": scattered_clouds_icon,
    "04d": broken_clouds_icon,
    "04n": broken_clouds_icon,
    "09d": shower_rain_icon,
    "09n": shower_rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunderstorm_icon,
    "11n": thunderstorm_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcon[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon,
        name: data.weather[0].description,
      });
    } catch (error) {
      console.log(error);
    }
    setShowMenu(false);
  };

  const option = {
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let time = new Date().toLocaleString("en-EN", option);

  useEffect(() => {
    search("Surabaya");
  }, []);

  return (
    <div className="weather">
      <div className={`navbar ${showMenu ? "active" : ""}`}>
        <nav>
          <a href="#">
            <h3>weather</h3>
          </a>
        </nav>
        <div className="extra-menu">
          <i className={showMenu ? "ri-close-large-line active" : "ri-menu-3-line"} onClick={handleClick}></i>
        </div>
      </div>
      <div className="main">
        <div className="content">
          <p>
            <span>W</span>eather refers to the atmospheric conditions at a specific place and time, including factors such as temperature humidity, preciptation, wind speed and direction.
          </p>
        </div>
        <div className="information">
          <div className="temperature">
            <h2>
              {weatherData.temperature}
              <span>°</span>
            </h2>
          </div>
          <div className="city">
            <h3>{weatherData.location}</h3>
            <p>{time}</p>
          </div>
          <div className="icon-weather">
            <img src={weatherData.icon} alt="" />
            <p>{weatherData.name}</p>
          </div>
        </div>
      </div>
      <div className={`sidebar ${showMenu ? "active" : ""}`}>
        <div className="searchbar">
          <input type="text" ref={inputRef} inputMode="search" placeholder="Another location" />
          <i className="ri-search-line" onClick={() => search(inputRef.current.value)}></i>
        </div>
        <div className="location">
          <ul>
            <li onClick={() => search("Jakarta")}>Jakarta</li>
            <li onClick={() => search("Bandung")}>Bandung</li>
            <li onClick={() => search("Surabaya")}>Surabaya</li>
            <li onClick={() => search("Semarang")}>Semarang</li>
            <li onClick={() => search("Yogyakarta")}>Yogyakarta</li>
          </ul>
        </div>
        <div className="weather-detail">
          <p className="title">Weather Details</p>
          <div className="detail">
            <ul>
              <li>
                <p>Location</p>
                <p>{weatherData.location}</p>
              </li>
              <li>
                <p>Temperature</p>
                <p>{weatherData.temperature}℃</p>
              </li>
              <li>
                <p>Humidity</p>
                <p>{weatherData.humidity}%</p>
              </li>
              <li>
                <p>Wind</p>
                <p>{weatherData.windSpeed} Km/h</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponents;
