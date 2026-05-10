import React from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { IoExitOutline } from "react-icons/io5";
import { PiPlayFill } from "react-icons/pi";
import { TbPlayerStopFilled } from "react-icons/tb";
import useSettingsStore from "../store/useSettingsStore.js";

const Bar = ({
  wpm,
  accuracy,
  time,
  errors,
  reactionTime,
  handleReset,
  setShowConfirm,
  multiplayer,
  gameMode,
  isSpeaking,
  onReplay,
  onStop,
  onRefocus,
}) => {
  const { textColor, fontSize } = useSettingsStore();

  const styleMap = {
    normal: "text-gray-200",
    blue: "neon-blue",
    pink: "neon-pink",
    green: "neon-green",
    orange: "neon-orange",
    red: "neon-red",
  };

  const handleAndRefocus = (fn) => {
    if (typeof fn === "function") fn();
    if (onRefocus) {
      setTimeout(() => onRefocus(), 50);
    }
  };

  return (
    <div
      className={`w-full px-12 pr-20 py-4 flex ${
        multiplayer ? "justify-end" : "justify-between"
      } items-center`}
      style={{ fontSize: `${fontSize * 0.9}px` }}
    >
      {!multiplayer && (
        <div className={`flex gap-10 items-center text-[1.2rem] ${styleMap[textColor]}`}>
          {wpm !== undefined && (
            <p className="neon-blue">
              WPM: <span className="neon-orange">{wpm.toFixed(1)}</span>
            </p>
          )}

          {accuracy !== undefined && (
            <p className="neon-blue">
              Accuracy: <span className="neon-green">{accuracy.toFixed(2)}%</span>
            </p>
          )}

          {errors !== undefined && (
            <p className="neon-blue">
              Errors: <span className="neon-red">{errors}</span>
            </p>
          )}

          {reactionTime !== undefined && (
            <p className="neon-blue">
              Reaction Time: <span className="neon-pink">{reactionTime.toFixed(2)}s</span>
            </p>
          )}

          {time !== undefined && (
            <p className="neon-blue">
              Time: <span className="neon-pink">{time.toFixed(2)}s</span>
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {gameMode === "Echo Mode" && (
          <button
            onClick={() => handleAndRefocus(isSpeaking ? onStop : onReplay)}
            className={`cursor-pointer glow-blue p-2 glow-hover rounded-md text-cyan-300 transition-all ${
              isSpeaking
                ? "bg-red-700 hover:bg-red-600"
                : "bg-blue-700 hover:bg-blue-600"
            }`}
            title={isSpeaking ? "Stop Speaking" : "Replay Voice"}
          >
            {isSpeaking ? <TbPlayerStopFilled /> : <PiPlayFill />}
          </button>
        )}

        {!multiplayer && (
          <button
            className="cursor-pointer glow-blue p-2 glow-hover text-cyan-300"
            onClick={() => handleAndRefocus(handleReset)}
            title="Restart Test"
          >
            <VscDebugRestart />
          </button>
        )}

        <button
          className="cursor-pointer glow-blue p-2 glow-hover text-cyan-300"
          onClick={() => handleAndRefocus(() => setShowConfirm(true))}
          title="Exit"
        >
          <IoExitOutline />
        </button>
      </div>
    </div>
  );
};

export default Bar;
