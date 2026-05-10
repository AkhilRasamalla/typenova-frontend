import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { useRef } from "react";

const ModeSelector = ({
  textCase,
  setTextCase,
  onConfirm,
  setShowModeSelector,
}) => {
  const cases = ["Lowercase", "Uppercase", "Mixed"];
  const hoverSoundRef = useRef(null);

  const handleCaseChange = (direction) => {
    const sound = hoverSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }

    const currentIndex = cases.indexOf(textCase);
    const nextIndex =
      direction === "left"
        ? (currentIndex - 1 + cases.length) % cases.length
        : (currentIndex + 1) % cases.length;
    setTextCase(cases[nextIndex]);
  };

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-[430px] flex flex-col gap-8 items-center animate-fadeIn halo-screen">
        <h2 className="text-2xl font-light text-center neon-blue tracking-wider">
          Select Practice Options
        </h2>
        {/* Text Type Selector */}
        <div className="flex flex-col items-center justify-center gap-3">
          <p className=" text-sm uppercase tracking-wider neon-blue">
            Text Type
          </p>
          <div className="flex items-center gap-6 text-xl font-light">
            <button
              onClick={() => handleCaseChange("left")}
              className="p-2 transition glow-blue glow-hover cursor-pointer"
            >
              <AiFillCaretLeft size={28} />
            </button>
            <span className="w-25 text-center neon-green">
              {textCase}
            </span>
            <button
              onClick={() => handleCaseChange("right")}
              className="p-2 transition glow-blue glow-hover cursor-pointer"
            >
              <AiFillCaretRight size={28} />
            </button>
          </div>
        </div>
        {/* buttons */}
        <div className="flex item-center gap-10 w-full">
          <button
            onClick={() => setShowModeSelector(false)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-lg py-3 rounded-xl transition-all duration-300 glow-blue glow-hover cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-blue-600 hover:bg-blue-500 text-lg py-3 rounded-xl transition-all duration-300 glow-blue glow-hover cursor-pointer"
          >
            Start
          </button>
        </div>
      </div>
      <audio ref={hoverSoundRef} src="/sound/hover.wav" preload="auto" />
    </div>
  );
};

export default ModeSelector;
