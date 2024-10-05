import React, { useState, useEffect } from "react";
import "./../styles/App.css";

export const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f63a61575aba27041c68e06fd11c9c51`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.cod === "404" || data.cod === "400") return;
        const DATA = {
          name: data?.name,
          temp: data?.main?.temp,
          sky: data?.weather[0]?.description,
        };
        setWeather(DATA);
        setCity("");
      })
      .catch((e) => {
        setWeather("");
        console.error(e);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div id="main">
      {/* Do not remove the main div */}
      <input
        className="search"
        value={city}
        type="text"
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter a city"
      />
      {weather && (
        <div className="weather">
          <h1>{weather?.name}</h1>
          <h1>{weather?.temp}F</h1>
          <h1>{weather?.sky}</h1>
        </div>
      )}
    </div>
  );
};
