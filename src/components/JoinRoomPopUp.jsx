import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import socket from "../socket.js";
import useSettingsStore from "../store/useSettingsStore";
import Images from "../constants/images.js";
import { useEffect } from "react";

const JoinRoomPopup = ({ popUp }) => {
  const navigate = useNavigate();
  const hoverSoundRef = useRef(null);

  // ✅ From global settings
  const { hoverSound, volume, avatarUrl, name } = useSettingsStore();

  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const playHoverSound = () => {
    if (!hoverSound) return;
    const sound = hoverSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play().catch(() => {});
    }
  };

  useEffect(() => {
    const handleJoinError = (data) => {
      setError(data);
    };
    socket.on("error", handleJoinError);

    return () => {
      socket.off("error", handleJoinError);
    };
  }, []);

  const handleJoin = () => {
    if (!roomId.trim()) return alert("Please enter Room ID");

    setError("");

    socket.emit("joinRoom", { roomId, name, avatar: avatarUrl });

    socket.once("joinedRoom", ({ roomId }) => {
      navigate(`/lobby?roomId=${roomId}`);
    });
  };

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Images.HomeImg})`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="w-[400px] max-w-[90%] bg-black/40 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_20px_rgba(0,255,255,0.25)] rounded-xl p-6 flex flex-col gap-6 text-white animate-fadeIn">
        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-cyan-400 tracking-wide">
          Join Room
        </h2>

        {/* Input Fields */}
        <div className="w-full flex flex-col gap-6">
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
          <div className="flex flex-col gap-2 items-center">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-black/40 border border-cyan-400/30 rounded-md p-2 text-center text-cyan-300 focus:outline-none focus:border-cyan-400 transition"
            />
            {error && (
              <span className="px-2 text-sm text-red-700">
                {error || "room not exist.."}{" "}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => popUp(false)}
            onMouseEnter={playHoverSound}
            className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-md py-2 font-semibold text-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleJoin}
            onMouseEnter={playHoverSound}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 rounded-md py-2 font-semibold text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all cursor-pointer"
          >
            Join
          </button>
        </div>

        {/* Hover Sound */}
        <audio ref={hoverSoundRef} src="/sound/hover.wav" preload="auto" />
      </div>
    </div>
  );
};

export default JoinRoomPopup;
