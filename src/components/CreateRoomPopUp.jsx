import { useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import generateRoomId from "../utils/generateRoomId.js";
import socket from "../socket.js";
import { useNavigate } from "react-router";
import useSettingsStore from "../store/useSettingsStore.js";
import Images from "../constants/images.js";

const CreateRoomPopup = ({ popUp }) => {
  const navigate = useNavigate();
  const { hoverSound, volume, name, avatarUrl } = useSettingsStore();

  const hoverSoundRef = useRef(null);
  const [option, setOption] = useState("Easy");
  const [modeOption, setModeOption] = useState("Race");

  const cases = ["Easy", "Medium", "Hard"];
  const modes = [
    "Race",
    "Tournament",
    "Color Clash",
    "Mirror Mode",
    "Memory Mode",
    "Echo Mode",
  ];

  const playHoverSound = () => {
    if (!hoverSound) return;
    const sound = hoverSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play().catch(() => {});
    }
  };

  const handleCaseChange = (direction) => {
    playHoverSound();
    const currentIndex = cases.indexOf(option);
    const nextIndex =
      direction === "left"
        ? (currentIndex - 1 + cases.length) % cases.length
        : (currentIndex + 1) % cases.length;
    setOption(cases[nextIndex]);
  };

  const handleModeChange = (direction) => {
    playHoverSound();
    const currentIndex = modes.indexOf(modeOption);
    const nextIndex =
      direction === "left"
        ? (currentIndex - 1 + modes.length) % modes.length
        : (currentIndex + 1) % modes.length;
    setModeOption(modes[nextIndex]);
  };

  const handleCreateRoom = () => {
    const roomId = generateRoomId();

    socket.emit("createRoom", {
      roomId,
      hostName: name,
      avatar: avatarUrl,
      difficulty: option,
      gameMode: modeOption,
    });

    popUp(false);
    setTimeout(() => navigate(`/lobby?roomId=${roomId}`), 100);
  };

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Images.HomeImg})`,
          filter: `blur(${blur}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="w-[400px] max-w-[90%] bg-black/40 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_20px_rgba(0,255,255,0.25)] rounded-xl p-6 flex flex-col gap-6 text-white animate-fadeIn">
        <h2 className="text-center text-2xl font-semibold text-cyan-400 tracking-wide">
          Create Room
        </h2>

        <div className="flex items-center justify-center gap-5">
          <img
            src={avatarUrl}
            alt="Preview"
            className="w-12 h-12 rounded-full border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.4)]"
          />
          <span className="text-cyan-300 font-medium text-lg truncate max-w-[120px] text-center">
            {name || "User"}
          </span>
        </div>

        <div className="flex flex-col gap-4 text-sm px-5">
          <div className="flex justify-between items-center px-5">
            <span className="text-cyan-300 uppercase tracking-wide">
              Difficulty
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCaseChange("left")}
                className="p-1 transition glow-blue glow-hover cursor-pointer"
              >
                <AiFillCaretLeft size={18} />
              </button>
              <span className="text-cyan-200 min-w-[80px] text-center font-medium">
                {option}
              </span>
              <button
                onClick={() => handleCaseChange("right")}
                className="p-1 transition glow-blue glow-hover cursor-pointer"
              >
                <AiFillCaretRight size={18} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center px-5">
            <span className="text-cyan-300 uppercase tracking-wide">
              Game Mode
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleModeChange("left")}
                className="p-1 transition glow-blue glow-hover cursor-pointer"
              >
                <AiFillCaretLeft size={18} />
              </button>
              <span className="text-cyan-200 min-w-[80px] text-center font-medium">
                {modeOption}
              </span>
              <button
                onClick={() => handleModeChange("right")}
                className="p-1 transition glow-blue glow-hover cursor-pointer"
              >
                <AiFillCaretRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => popUp(false)}
            onMouseEnter={playHoverSound}
            className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-md py-2 font-semibold text-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateRoom}
            onMouseEnter={playHoverSound}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 rounded-md py-2 font-semibold text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all cursor-pointer"
          >
            Create
          </button>
        </div>

        <audio ref={hoverSoundRef} src="/sound/hover.wav" preload="auto" />
      </div>
    </div>
  );
};

export default CreateRoomPopup;
