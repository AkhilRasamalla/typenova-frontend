import React from "react";

const Loading = ({ image }) => {
  return (
    <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="absolute inset-0 bg-black/20"></div>


      <p className="relative z-10 text-[1.5rem] mb-20 text-white tracking-wider animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
