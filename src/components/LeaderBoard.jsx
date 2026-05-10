import React from "react";

const LeaderBoard = ({ players, socketId }) => {
  const sortedPlayers = [...players].sort((a, b) => b.progress - a.progress);
  const topPlayers = sortedPlayers.slice(0, 5);
  const hasMore = sortedPlayers.length > 5;

  return (
    <div className="absolute top-5 right-5 z-30 w-[220px] 2xl:w-[260px] rounded-xl p-4 bg-black/40 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
      <h2 className="text-center text-lg mb-3 text-cyan-400 font-semibold tracking-wide">
        Live Progress
      </h2>

      <div className="flex flex-col gap-3">
        {topPlayers.map((player, i) => {
          const isCurrent = player.id === socketId;

          return (
            <div
              key={player.id}
              className={`flex flex-col gap-2 rounded-md p-1.5 transition-all duration-200 ${
                isCurrent
                  ? "bg-yellow-500/10 border border-yellow-400/40 shadow-[0_0_10px_rgba(255,255,0,0.3)]"
                  : "bg-white/5 border border-cyan-400/20 hover:bg-white/10"
              }`}
            >
              {/* Player Info */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src={player.avatar}
                      alt="Preview"
                      className="w-6 h-6 rounded-full border border-cyan-500"
                    />
                    <span
                      className={`text-sm font-medium truncate max-w-[100px] ${
                        isCurrent
                          ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]"
                          : "text-cyan-300"
                      }`}
                    >
                      {player.name || "User"}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-green-500">
                  {Math.floor(player.progress)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-md overflow-hidden border border-cyan-400/30 bg-white/5">
                <div
                  className={`h-full transition-all duration-300 ${
                    isCurrent
                      ? "bg-yellow-400 shadow-[0_0_10px_rgba(255,255,0,0.8)]"
                      : "bg-cyan-500 shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                  }`}
                  style={{ width: `${player.progress}%` }}
                />
              </div>
            </div>
          );
        })}

        {hasMore && (
          <div className="text-center text-gray-500 text-sm mt-1">…</div>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
