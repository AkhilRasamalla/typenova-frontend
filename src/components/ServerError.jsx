import React from "react";
import Images from "../constants/images.js";

const ServerError = ({ error }) => {
  return (
    <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Images.ServerImg})` }}
      ></div>

      <div className="absolute inset-0 bg-black/30"></div>
      <p className="relative z-10 text-[1.5rem] mb-20 text-white tracking-wider animate-pulse">
        {error}
      </p>
    </div>
  );
};

export default ServerError;
