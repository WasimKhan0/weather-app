import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import location from "./assets/images/location.png";
import search from "./assets/images/search.png";
import Display from "./components/Display";

function App() {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  const [weatherData, setWeatherData] = useState([]);
  const apiKey = "55ef3389a21817e75f021fbbc137f78a";

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      const latitude = response.data.city.coord.lat;
      const longitude = response.data.city.coord.lon;
      setLat(latitude);
      setLon(longitude);

      console.log(longitude, latitude);
      const nextFiveDaysData = response.data.list.filter(
        (item, index) => index % 8 === 0
      );

      setWeatherData(nextFiveDaysData);
      console.log(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const convertDecimalToDMS = (decimal) => {
    const degrees = Math.floor(decimal);
    const minutes = Math.floor((decimal - degrees) * 60);
    const seconds = ((decimal - degrees - minutes / 60) * 3600).toFixed(2);

    return `${degrees}° ${minutes}' ${seconds}"`;
  };

  const latitudeDMS = convertDecimalToDMS(lat);
  const longitudeDMS = convertDecimalToDMS(lon);

  return (
    <>
      <Header />
      <div className="sm:w-full h-[800px]  hero">
         <div className="flex flex-col-reverse sm:flex-row w-[360px] sm:w-[1200px] p-10 items-center ml-[155px] justify-between">
          <div className="flex flex-col gap-2 mr-[90px] sm:mr-[0px] mt-[10px]">
            <div className="flex gap-2 ">
              <img
                className="w-[30px] h-[30px] shrink-0 mt-1  "
                src={location}
              ></img>
              <h1 className="h-[28px]  text-[#1D2540] text-[23px] font-bold">
                {lat ? city:"city"}
              </h1>
            </div>
            <div>
              <h3 className=" h-[16px] w-[240px] text-[#606060] text-[14px] font-400">
                {/* 27°10'36'' N & 78°0'29'' E */}
                {lat? `${latitudeDMS} N & ${longitudeDMS} E` :"Coordinates"}
                
              </h3>
            </div>
          </div>

          <div className="w-[327px] h-[46px] bg-white round-[8px] flex justify-between rounded-[8px]">
            <input
              className="w-[238px] h-[46px] p-5 rounded-[8px] outline-0"
              placeholder="Search your city here..."
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <img
              className="w-[28px] h-[28px] mt-2 mr-[10px] cursor-pointer"
              src={search}
              onClick={getWeather}
            ></img>
          </div>
        </div>
        <hr className="hr"></hr>

        <Display weatherData={weatherData} />
      </div>
    </>
  );
}

export default App;
