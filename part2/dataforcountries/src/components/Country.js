import axios from "axios";
import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  const [weatherFetched, setWeatherFetched] = useState(false);
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]},${country.cca2}&limit=1&appid=${API_KEY}`
      )
      .then((res) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&appid=${API_KEY}&units=metric`
          )
          .then((res) => {
            setWeatherFetched(true);
            setWeather(res.data);
          });
      });
  }, []);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital.map((capital) => capital + " ")}</p>
      <p>area: {country.area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}-flag`} />
      <h2>Weather in {country.capital[0]}</h2>
      {weatherFetched && (
        <>
          <p>temperature: {weather.main.temp} Celcius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          ></img>
          <p>wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default Country;
