import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import Images from "../constants/images.js";

const SoloPlay = () => {
  const navigate = useNavigate();

  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);

  const [hoverEnabled, setHoverEnabled] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setHoverEnabled(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleHover = () => {
    if (!hoverEnabled) return;
    const sound = hoverSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  };

  const handleClick = (path) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current
        .play()
        .then(() => setTimeout(() => navigate(path), 150))
        .catch(() => navigate(path));
    } else {
      navigate(path);
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* Background */}
      <div
        className={`absolute inset-0  bg-cover bg-center filter blur-[3px]`}
        style={{ backgroundImage: `url(${Images.HomeImg})` }}
      ></div>
      <div className="absolute inset-0 bg-black/70"></div>

      {/* ModeSelector Popup */}

      {/* Main Menu */}
      <div className="relative z-10 flex  items-center justify-center h-full">
        <ul className="uppercase font-bold space-y-3 tracking-wider text-center text-[var(--accent-color)] text-xl">
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onPointerEnter={handleHover}
            onClick={() => navigate("/random-rush")}
          >
            Random Rush
          </li>
          <li
            className="px-13 py-5  border-2 glow-hover glow-blue cursor-pointer"
            onPointerEnter={handleHover}
            onClick={() => navigate("/practice-mode")}
          >
            Practice Mode
          </li>
        </ul>
      </div>

      {/* Bottom Controls */}
      <div
        className="absolute z-10 inset-0 top-[2%] left-[2%] text-[var(--accent-color)] glow-hover cursor-pointer h-10 w-10 rounded-full"
        onClick={() => handleClick("/home")}
        onPointerEnter={handleHover}
      >
        <IoCaretBackCircleOutline className="h-full w-full" />
      </div>

      {/* Sounds */}
      <audio ref={hoverSoundRef} src="/sound/hover.wav" preload="auto" />
      <audio ref={clickSoundRef} src="/sound/click.wav" preload="auto" />
    </div>
  );
};

export default SoloPlay;
