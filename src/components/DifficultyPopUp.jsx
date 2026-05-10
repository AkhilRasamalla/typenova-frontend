import { useState, useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import useSettingsStore from "../store/useSettingsStore.js";
import Images from "../constants/images.js";

const DifficultyPopUp = ({
  title = "Select Difficulty",
  onConfirm,
  onCancel,
}) => {
  const { hoverSound, volume, blur } = useSettingsStore();
  const hoverSoundRef = useRef(null);

  const [difficulty, setDifficulty] = useState("Easy");
  const difficulties = ["Easy", "Medium", "Hard"];

  const playHoverSound = () => {
    if (!hoverSound) return;
    const sound = hoverSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play().catch(() => {});
    }
  };

  const handleDifficultyChange = (direction) => {
    playHoverSound();
    const currentIndex = difficulties.indexOf(difficulty);
    const nextIndex =
      direction === "left"
        ? (currentIndex - 1 + difficulties.length) % difficulties.length
        : (currentIndex + 1) % difficulties.length;
    setDifficulty(difficulties[nextIndex]);
  };

  const handleConfirm = () => {
    playHoverSound();
    if (onConfirm) onConfirm(difficulty);
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

      <div className="w-[400px] max-w-[90%] bg-black/40 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_20px_rgba(0,255,255,0.25)] rounded-xl p-6 flex flex-col gap-5 text-white animate-fadeIn relative z-10">
        <h2 className="text-center text-2xl font-semibold text-cyan-400 tracking-wide">
          {title}
        </h2>

        <div className="flex justify-between items-center px-5 mt-2">
          <span className="text-cyan-300 uppercase tracking-wide">
            Difficulty
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDifficultyChange("left")}
              className="p-1 transition glow-blue glow-hover cursor-pointer"
            >
              <AiFillCaretLeft size={18} />
            </button>
            <span className="text-cyan-200 min-w-[80px] text-center font-medium">
              {difficulty}
            </span>
            <button
              onClick={() => handleDifficultyChange("right")}
              className="p-1 transition glow-blue glow-hover cursor-pointer"
            >
              <AiFillCaretRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={onCancel}
            onMouseEnter={playHoverSound}
            className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-md py-2 font-semibold text-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            onMouseEnter={playHoverSound}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 rounded-md py-2 font-semibold text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all cursor-pointer"
          >
            Confirm
          </button>
        </div>

        <audio ref={hoverSoundRef} src="/sound/hover.wav" preload="auto" />
      </div>
    </div>
  );
};

export default DifficultyPopUp;
