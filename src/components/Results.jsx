import React from "react";
import { useNavigate } from "react-router";
import Images from "../constants/images";
import useSettingsStore from "../store/useSettingsStore";

const Results = ({
  wpm,
  accuracy,
  errors,
  time,
  handleReset,
  quitPath,
  reactionTime,
  score,
}) => {
  const navigate = useNavigate();
  const { blur } = useSettingsStore();

  return (
    <div className="relative h-full w-full">
    
      <div className="absolute inset-0 bg-black/70" />

      {/* Results Card */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="w-[420px] max-w-[90%] bg-black/40 backdrop-blur-md 
            border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.3)] 
            rounded-2xl p-6 flex flex-col gap-6 text-white animate-fadeIn">

          <h2 className="text-center text-2xl font-semibold text-cyan-400 tracking-wide">
            Results
          </h2>

          {/* Result Values */}
          <div className="flex flex-col gap-3 text-center text-[1.1rem]">
            {reactionTime && (
              <p className="text-cyan-300">
                Reaction Time: <span className="neon-pink">{reactionTime.toFixed(2)}s</span>
              </p>
            )}

            {score && (
              <p className="text-cyan-300">
                Score: <span className="neon-orange">{score}</span>
              </p>
            )}

            {wpm && (
              <p className="text-cyan-300">
                WPM: <span className="neon-orange">{wpm.toFixed(1)}</span>
              </p>
            )}

            {accuracy && (
              <p className="text-cyan-300">
                Accuracy: <span className="neon-green">{accuracy.toFixed(2)}%</span>
              </p>
            )}

            {errors !== undefined && (
              <p className="text-cyan-300">
                Errors: <span className="neon-red">{errors}</span>
              </p>
            )}

            {time && (
              <p className="text-cyan-300">
                Time: <span className="neon-blue">{time.toFixed(2)}s</span>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => navigate(quitPath)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-md py-2 
                         font-semibold text-sm shadow-[0_0_10px_rgba(255,255,255,0.1)]
                         transition-all cursor-pointer"
            >
              Quit
            </button>

            <button
              onClick={handleReset}
              className="flex-1 bg-cyan-600 hover:bg-cyan-500 rounded-md py-2 
                         font-semibold text-sm shadow-[0_0_12px_rgba(0,255,255,0.3)]
                         transition-all cursor-pointer"
            >
              Retry
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Results;
