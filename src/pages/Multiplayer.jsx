import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import CreateRoomPopUp from "../components/CreateRoomPopUp.jsx";
import JoinRoomPopUp from "../components/JoinRoomPopUp.jsx";
import Images from "../constants/images.js";
import useSettingsStore from "../store/useSettingsStore";

const Multiplayer = () => {
  const navigate = useNavigate();

  // ✅ Settings store integration
  const { hoverSound, typingSound, volume } = useSettingsStore();

  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);

  const [hoverEnabled, setHoverEnabled] = useState(false);
  const [showCreatePopUp, setShowCreatePopUp] = useState(false);
  const [showJoinPopUp, setShowJoinPopUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHoverEnabled(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleHover = () => {
    if (!hoverEnabled || !hoverSound) return;
    const sound = hoverSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play().catch(() => {});
    }
  };

  const handleClick = (path) => {
    if (!clickSoundRef.current) return navigate(path);
    const sound = clickSoundRef.current;
    sound.currentTime = 0;
    sound.volume = volume;
    sound
      .play()
      .then(() => setTimeout(() => navigate(path), 150))
      .catch(() => navigate(path));
  };

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[2px]"
        style={{ backgroundImage: `url(${Images.HomeImg})` }}
      ></div>
      <div className="absolute inset-0 bg-black/70"></div>

      {showCreatePopUp && <CreateRoomPopUp popUp={setShowCreatePopUp} />}
      {showJoinPopUp && <JoinRoomPopUp popUp={setShowJoinPopUp} />}

      <div className="relative z-10 flex items-center justify-center h-full">
        <ul className="uppercase font-bold space-y-3 tracking-wider text-center text-[var(--accent-color)] text-xl">
          <li
            className="px-13 py-5  border-2 glow-hover glow-blue cursor-pointer"
            onPointerEnter={handleHover}
            onClick={() => setShowCreatePopUp(true)}
          >
            Create Room
          </li>
          <li
            className="px-13 py-5  border-2 glow-hover glow-blue cursor-pointer"
            onPointerEnter={handleHover}
            onClick={() => setShowJoinPopUp(true)}
          >
            Join Room
          </li>
        </ul>
      </div>

      <div
        className="absolute z-10 top-[2%] left-[2%] text-[var(--accent-color)] glow-hover cursor-pointer h-10 w-10 rounded-full"
        onClick={() => handleClick("/home")}
        onPointerEnter={handleHover}
      >
        <IoCaretBackCircleOutline className="h-full w-full" />
      </div>

      <audio ref={hoverSoundRef} src="/sound/hover.wav" preload="auto" />
      <audio ref={clickSoundRef} src="/sound/click.wav" preload="auto" />
    </div>
  );
};

export default Multiplayer;
