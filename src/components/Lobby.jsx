import React, { useEffect, useState } from "react";
import socket from "../socket.js";
import { useNavigate, useLocation } from "react-router";
import Loading from "../components/Loading.jsx";
import ServerError from "../components/ServerError.jsx";
import Images from "../constants/images.js";
import useGameStore from "../store/useGameStore.js";

const Lobby = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const roomId = params.get("roomId");

  const [players, setPlayers] = useState([]);
  const [hostId, setHostId] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [gameStarting, setGameStarting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    socket.on(
      "gameStarted",
      ({ quote, roomId, startTime, serverTime, gameMode, payload }) => {
        const clientTime = Date.now();
        const timeOffset = serverTime - clientTime; // how far ahead/behind the server is

        const setGameData = useGameStore.getState().setGameData;

        setGameData({
          roomId,
          quote: quote || "",
          startTime: startTime || Date.now(),
          gameMode,
          payload,
          timeOffset, 
        });

        navigate("/multi-mode");
      }
    );

    socket.on(
      "roomState",
      ({ players, hostId, hostName, gameMode, gameState, difficulty }) => {
        setPlayers(players || []);
        setHostId(hostId);
        setIsHost(socket.id === hostId);
        setDifficulty(difficulty);
        setGameMode(gameMode);
      }
    );

    socket.on("serverStatus", (status) => {
      if (status === "waking") {
        setLoading(true);
      } else if (status === "error") {
        setLoading(false);
        setServerError(true);
      }
    });

    socket.emit("getRoomState", { roomId });

    return () => {
      socket.off("roomState");
      socket.off("getRoomState");
      socket.off("serverStatus");
      socket.off("gameStarted");
    };
  }, [roomId, navigate]);

  useEffect(() => {
    if (serverError) {
      const timer = setTimeout(() => navigate("/multiplayer"), 5000);
      return () => clearTimeout(timer);
    }
  }, [serverError, navigate]);

  const handleStart = () => {
    if (!isHost) return;
    setGameStarting(true);
    socket.emit("startGame", { roomId, difficulty, gameMode });
  };

  const handleExit = () => {
    socket.emit("leaveRoom", { roomId });
    navigate("/multiplayer");
  };

  if (loading) return <Loading image={Images.LobbyLoadImg} />;
  if (serverError) return <ServerError error={"Server Not Responding..."} />;

  return (
    <div className="relative h-full w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[6px]"
        style={{ backgroundImage: `url(${Images.HomeImg})` }}
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative h-full z-10 flex justify-center items-center">
        <div className="p-6 rounded-2xl text-white w-[400px] max-w-[90%] flex flex-col gap-5 items-center bg-black/40 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_25px_rgba(0,255,255,0.2)] animate-fadeIn">
          {/* Room Info */}
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-xl font-semibold text-cyan-400 tracking-wide">
              Room ID:
            </h2>
            <p className="text-xl text-white/90 select-all">{roomId}</p>
          </div>

          <div className="w-full flex justify-between items-center text-gray-300 text-sm px-5">
            <p>
              Difficulty:{" "}
              <span className="text-cyan-300 font-medium">
                {difficulty || "—"}
              </span>
            </p>
            <p>
              Game Mode:{" "}
              <span className="text-cyan-300 font-medium">
                {gameMode || "—"}
              </span>
            </p>
          </div>

          <div className="text-gray-300 text-sm">
            <p>
              Players:{" "}
              <span className="text-cyan-300 font-medium">
                {players.length || "—"}
              </span>
            </p>
          </div>

          {/* Players List */}
          <div className="flex flex-col gap-2 w-full mt-3">
            {players.slice(0, 5).map((player, i) => (
              <div
                key={player.id}
                className={`flex items-center justify-between px-4 py-1.5 rounded-md border transition-all duration-300 ${
                  player.id === hostId
                    ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-200 shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                    : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{i + 1}.</span>
                  <div className="flex gap-3 items-center">
                    <img
                      src={player.avatar}
                      alt="Preview"
                      className="w-8 h-8 rounded-full border-2 border-cyan-500"
                    />
                    <span className="text-cyan-300 font-medium text-sm truncate max-w-[100px] text-center">
                      {player.name || "User"}
                    </span>
                  </div>
                </div>
                {player.id === hostId && (
                  <span className="text-[0.7rem] uppercase text-cyan-400 font-semibold tracking-wide">
                    Host
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 w-full">
            <button
              onClick={handleExit}
              disabled={gameStarting}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                gameStarting
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]"
              }`}
            >
              Exit
            </button>

            {isHost && (
              <button
                onClick={handleStart}
                disabled={gameStarting}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                  gameStarting
                    ? "bg-cyan-700/50 text-gray-300 cursor-not-allowed"
                    : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_10px_rgba(0,255,255,0.3)] animate-glow-pulse"
                }`}
              >
                Start
              </button>
            )}
          </div>

          <p className="mt-2 text-cyan-400 text-sm animate-pulse text-center">
            {isHost
              ? gameStarting
                ? "Starting game..."
                : "Waiting for players..."
              : "Waiting for host to start..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
