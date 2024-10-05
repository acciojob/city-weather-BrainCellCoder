import React, { useState, useEffect } from "react";
import "./../styles/App.css";

export const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const getWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f63a61575aba27041c68e06fd11c9c51`
    );
    const data = await res.json();
    console.log(data);
    if (data.cod === "404" || data.cod === "400") return;
    const DATA = {
      name: data?.name,
      temp: data?.main?.temp,
      sky: data?.weather[0]?.description,
    };
    setWeather(DATA);
  };

  useEffect(() => {
    try {
      getWeather();
    } catch (e) {
      setWeather("");
    }
  }, [city]);
  return (
    <div id="main">
      {/* Do not remove the main divasd */}
      <input
        className="search"
        type="text"
        onChange={(e) => setCity(e.target.value)}
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
