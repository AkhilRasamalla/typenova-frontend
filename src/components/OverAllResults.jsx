import React, { useEffect, useState } from "react";
import Images from "../constants/images.js";

const OverAllResults = ({ allPlayers, gameMode, onClose }) => {
  const [countdown, setCountdown] = useState(15);

  const topPlayers = [...allPlayers].slice(0, 3);
  const badges = ["🥇", "🥈", "🥉"];
  const isTournament = gameMode === "Tournament";

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => setCountdown((prev) => prev - 1), 1000);
    if (countdown === 0) onClose();
    return () => clearInterval(timer);
  }, [countdown, onClose]);

  return (
    <div className="absolute inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black/70" />

      <div className="w-[400px] max-w-[90%] bg-black/40 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_20px_rgba(0,255,255,0.25)] rounded-xl p-6 flex flex-col gap-4 text-white animate-fadeIn">
        <h2 className="text-center text-2xl font-semibold text-cyan-400 tracking-wide">
          {isTournament ? "🏆 Tournament Results" : `🏁 ${gameMode} Results`}
        </h2>

        <div className="flex flex-col gap-3">
          {topPlayers.map((p, i) => (
            <div
              key={p.id}
              className={`flex justify-between items-center px-3 py-2 rounded ${
                i === 0
                  ? "bg-green-700/40"
                  : i === 1
                  ? "bg-blue-700/30"
                  : i === 2
                  ? "bg-purple-700/30"
                  : "bg-gray-800/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{badges[i]}</span>
                <img
                  src={p.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-cyan-500"
                />
                <span className="text-cyan-300 font-medium text-sm truncate max-w-[150px]">
                  {p.name || "User"}
                </span>
              </div>
              {isTournament && (
                <span className="text-gray-300 text-sm">
                  {p.wpm.toFixed(1)} WPM • {p.accuracy.toFixed(1)}%
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="text-white text-[1.2rem] mt-3 text-center">
          Going to lobby in{" "}
          <span className="text-blue-400 font-semibold">{countdown}</span>s
        </p>
      </div>
    </div>
  );
};

export default OverAllResults;
