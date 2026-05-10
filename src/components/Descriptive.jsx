import React from "react";
import { useNavigate } from "react-router";

const Descriptive = ({ title, description, handleStart }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="w-[420px] max-w-[90%] bg-black/40 backdrop-blur-md border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.3)] rounded-2xl p-6 flex flex-col gap-5 text-center text-white animate-fadeIn">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-1">{title}</h2>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full py-2 bg-gray-500 hover:bg-gray-400 rounded-md font-semibold text-sm tracking-wide shadow-[0_0_12px_rgba(0,255,255,0.3)] transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleStart}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 rounded-md font-semibold text-sm tracking-wide shadow-[0_0_12px_rgba(0,255,255,0.3)] transition-all cursor-pointer"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Descriptive;
