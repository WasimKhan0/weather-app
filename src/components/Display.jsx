import React from "react";
import calender from "../assets/images/calender.png";

import rainy from "../assets/images/rainy.png";
import sunny from "../assets/images/sunny.png";
import windy from "../assets/images/windy.png";
import snowy from "../assets/images/snowy.png";

const Display = ({ weatherData }) => {
  const todayDate = new Date()
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");

  return (
    <div className="flex overflow-hidden">
      <div className="w-[136px] mt-[100px] ml-[200px] ">
        <div className="flex flex-col">
          <h3 className="h-[16px] text-[#444] text-[12px] font-400">
            Start date:
          </h3>
          <div className="w-[127px] h-[37px] flex justify-around p-2 border-[1px] border-[#464646] rounded-[4px] bg-[#D9D9D9]">
            <img className="h-[23px] w-[23px]" src={calender}></img>
            <h2 className="h-[16px] text-[#444] text-[13px] font-700">
              {todayDate}
            </h2>
          </div>
        </div>

        <div className="w-[136px] h-[184px] flex flex-col p-2 justify-between">
          <h2 className="text-[#000] text-[15px] font-400 leading-normal">
            High Temperature
          </h2>
          <h2 className="text-[#000] text-[15px] font-400 leading-normal">
            Low Temperature
          </h2>
          <h2 className="text-[#000] text-[15px] font-400 leading-normal">
            Humidity
          </h2>
          <h2 className="text-[#000] text-[15px] font-400 leading-normal">
            Sunrise Time
          </h2>
          <h2 className="text-[#000] text-[15px] font-400 leading-normal">
            Sunset Time
          </h2>
        </div>
      </div>

      {weatherData.map((item, index) => {
        const rawDate = new Date(item.dt * 1000);
        const date = rawDate
          .toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
          .replace(",", "");
        const maxTempInC = (item.main.temp_max - 273.15).toFixed(0);
        const maxTempInF = (
          (item.main.temp_max - 273.15).toFixed(0) * (9 / 5) +
          32
        ).toFixed(0);

        const minTempInC = (item.main.temp_min - 273.15).toFixed(0);
        const minTempInF = (
          (item.main.temp_min - 273.15).toFixed(0) * (9 / 5) +
          32
        ).toFixed(0);

        const humidity = item.main.humidity;
        const weather = item.weather[0].main;

        const weatherId = item.weather[0].id;

        const getEmojiForWeather = (weatherId) => {
          if (weatherId >= 200 && weatherId < 300) {
            return rainy;
          } else if (weatherId >= 300 && weatherId < 600) {
            return rainy;
          } else if (weatherId >= 600 && weatherId < 700) {
            return snowy;
          } else if (weatherId >= 700 && weatherId < 800) {
            return windy;
          } else if (weatherId === 800) {
            return sunny;
          } else if (weatherId > 800) {
            return rainy;
          } else {
            return snowy;
          }
        };

        const emoji = getEmojiForWeather(weatherId);

        return (
          <div key={index}>
            <div className="w-[136px] mt-[56px] ml-[40px]">
              <h2 className=" text-[#444] text-[18px] font-700 text-center">
                {date}
              </h2>

              <div className="w-[152px] h-[275px] box">
                <div className="flex justify-around p-2">
                  <img src={emoji} className="h-[36px] w-[36px]"></img>
                  <h2 className="h-[61px] mt-1 text-white text-[19px] font-bold leading-normal">
                    {weather}
                  </h2>
                </div>
                <hr className="hrBox mt-[-15px]"></hr>
                <div className=" h-[183px] flex flex-col p-2 justify-between items-center">
                  <h2 className="text-white text-[15px] font-700 leading-normal">
                    {maxTempInC}°C/{maxTempInF}°F
                  </h2>
                  <h2 className="text-white text-[15px] font-700 leading-normal">
                    {minTempInC}°C/{minTempInF}°F
                  </h2>
                  <h2 className="text-white text-[15px] font-700 leading-normal">
                    {humidity}%
                  </h2>
                  <h2 className="text-white text-[15px] font-700 leading-normal">
                    06:21 AM
                  </h2>
                  <h2 className="text-white text-[15px] font-700 leading-normal">
                    05:93 PM
                  </h2>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Display;
