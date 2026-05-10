import React from "react";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import Images from "../constants/images";

const RushMode = () => {
  const navigate = useNavigate();

  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);

  const [hoverEnabled, setHoverEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHoverEnabled(true), 1000); // enable after 1s
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (path) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current
        .play()
        .then(() => {
          setTimeout(() => navigate(path), 150);
        })
        .catch(() => {
          navigate(path);
        });
    } else {
      navigate(path);
    }
  };

  const handleHover = () => {
    if (!hoverEnabled) return;

    const sound = hoverSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  };

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute inset-0  bg-cover bg-center filter blur-[3px]`}
        style={{ backgroundImage: `url(${Images.HomeImg})` }}
      ></div>

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <ul className="uppercase font-bold space-y-3 text-center tracking-wider text-[var(--accent-color)] border-[var(--accent-color)] text-xl">
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onPointerEnter={handleHover}
            onFocus={handleHover}
            onClick={() => navigate("/rush/color-clash")}
          >
            🎨 Color Clash
          </li>
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onMouseEnter={handleHover}
            onClick={() => navigate("/rush/mirror-mode")}
          >
            🔁 Mirror Mode
          </li>
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onMouseEnter={handleHover}
            onClick={() => navigate("/rush/memory-mode")}
          >
            🧠 Memory Mode
          </li>
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onMouseEnter={handleHover}
            onClick={() => navigate("/rush/echo-mode")}
          >
            🎧 Echo Mode
          </li>
        </ul>
      </div>

      <div
        className="absolute z-10 inset-0 top-[2%] left-[2%] text-[var(--accent-color)] glow-hover cursor-pointer h-10 w-10 rounded-full"
        onClick={() => handleClick("/home")}
        onPointerEnter={handleHover}
      >
        <IoCaretBackCircleOutline className="h-full w-full" />
      </div>

      <audio ref={hoverSoundRef} src="/sound/hover.wav" preload="auto"></audio>
      <audio ref={clickSoundRef} src="/sound/click.wav" preload="auto"></audio>
    </div>
  );
};

export default RushMode;
