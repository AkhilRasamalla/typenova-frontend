import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../constants/images";

const LandingPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => {
          setTimeout(() => navigate("/home"), 150);
        })
        .catch(() => {
          navigate("/home");
        });
    } else {
      navigate("/home");
    }
  };

  return (
    <div
      className={`relative w-full h-full bg-cover bg-center cursor-pointer`}
      style={{ backgroundImage: `url(${Images.LandingImg})` }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative  h-full flex flex-col items-center justify-between text-[1.3rem] font-extrabold uppercase tracking-[0.075em] text-white">
        <div className="h-30 px-2 glow mt-35 flex items-center justify-center">
          <div className="h-24 px-4 glow flex items-center justify-center">
            welcome to TypeRush
          </div>
        </div>

        <p className="text-2xl mb-20 text-white/90 tracking-wider animate-pulse">
          TAP TO START
        </p>
        <div className="absolute left-[46%] w-[0.1px] h-35  glow"></div>
        <div className="absolute right-[46%] w-[0.1px] h-35  glow"></div>
      </div>
      <div className="absolute inset-0 z-10 bg-black/20"></div>
      <audio src="/sound/click.wav" ref={audioRef} preload="auto"></audio>
    </div>
  );
};

export default LandingPage;
