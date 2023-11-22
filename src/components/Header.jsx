import React from "react";
import logo from "../assets/images/logo.png";
import refresh from "../assets/images/refresh.png";

const Header = () => {
  const reload=()=>{
    location.reload();
  }
  return (
    <div className="h-[47px] head bg-opacity-49 flex  justify-around items-center sm:w-full">
      <div className="flex gap-2 mr-[200px]">
        <img className="w-[31px] h-[31px] shrink-0" src={logo}></img>
        <h1 className="w-[149px] h-[29px] text-white font-700 text-[25px] font-bold">
          Weather 99
        </h1>
      </div>

      <div
        className="flex gap-2 cursor-pointer ml-[100px]"
        onClick={reload}
      >
        <img className="w-[26px] h-[26px] shrink-0" src={refresh}></img>
        <h1 className="w-[53px] h-[20px] mt-[3px] text-white font-700 text-[14px]  font-bold">
          Refresh
        </h1>
      </div>
    </div>
  );
};

export default Header;
