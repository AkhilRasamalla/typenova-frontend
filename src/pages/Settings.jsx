import React, { useState } from "react";
import { useNavigate } from "react-router";
import Images from "../constants/images";
import useSettingsStore from "../store/useSettingsStore";
import { avatarSeeds } from "../constants/avatarSeeds.js";
import NetworkPing from "../components/NetworkPing.jsx";

const Settings = () => {
  const navigate = useNavigate();

  // Tab control
  const [activeTab, setActiveTab] = useState("profile");

  // Zustand store values
  const {
    hoverSound,
    typingSound,
    volume,
    textColor,
    blur,
    fontSize,
    name,
    avatarUrl,
    avatarSeed,
    setHoverSound,
    setTypingSound,
    setVolume,
    setTextColor,
    setBlur,
    setFontSize,
    setName,
    setAvatar,
    resetSettings,
  } = useSettingsStore();

  const styleMap = {
    white: "text-white",
    blue: "neon-blue",
    pink: "neon-pink",
    green: "neon-green",
    orange: "neon-orange",
    red: "neon-red",
  };

  const handleSaveSettings = () => {
    const settings = {
      hoverSound,
      typingSound,
      volume,
      textColor,
      blur,
      fontSize,
      name,
      avatarSeed,
      avatarUrl,
    };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    navigate("/home");
  };

  const handleReset = () => {
    resetSettings();
    navigate("/home");
  };

  return (
    <div className="relative h-full w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Images.HomeImg})`,
          filter: `blur(${blur}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Settings Card */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="w-[420px] max-w-[90%] bg-black/40 backdrop-blur-md border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.3)] rounded-2xl p-6 flex flex-col gap-5 text-white animate-fadeIn">
          <h2 className="text-center text-2xl font-semibold text-cyan-400 mb-2 tracking-wide">
            Settings
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-2">
            {["profile", "audio", "visual", "font", "general"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-md text-sm font-semibold border cursor-pointer transition-all ${
                  activeTab === tab
                    ? "bg-cyan-600 border-cyan-500 text-white"
                    : "bg-transparent border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {/* 🧍 PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex justify-between gap-6 w-full mt-3 px-8">
                  {/* Avatar Preview */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <img
                      src={avatarUrl}
                      alt="Preview"
                      className="w-20 h-20 rounded-full border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                    />
                    <span className="text-cyan-300 font-medium text-sm mt-1 truncate max-w-[80px] text-center">
                      {name || "User"}
                    </span>
                  </div>

                  {/* Name Input */}
                  <div className="flex flex-col items-center flex-1">
                    <label className="text-sm text-gray-300 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-black/40 border border-cyan-400/30 rounded-md p-2 text-center text-cyan-300 focus:outline-none"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-cyan-400">
                  Choose Your Avatar
                </h3>

                <div className="flex flex-wrap justify-center gap-3 w-full mx-auto">
                  {avatarSeeds.slice(0, 18).map((seed) => (
                    <button
                      key={seed}
                      onClick={() => setAvatar(seed)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                        avatarSeed === seed
                          ? "border-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.6)] scale-110"
                          : "border-transparent hover:border-cyan-300/40 hover:scale-105"
                      }`}
                    >
                      <img
                        src={`https://api.dicebear.com/9.x/bottts/svg?seed=${seed}`}
                        alt={seed}
                        className="w-full h-full rounded-full bg-black/20"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 🔊 AUDIO TAB */}
            {activeTab === "audio" && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Hover Sound</span>
                  <button
                    onClick={() => setHoverSound(!hoverSound)}
                    className={`px-3 py-1 rounded-md text-sm font-semibold border transition-all cursor-pointer ${
                      hoverSound
                        ? "bg-cyan-600 border-cyan-500 hover:bg-cyan-500"
                        : "bg-gray-700 border-gray-600 hover:bg-gray-500"
                    }`}
                  >
                    {hoverSound ? "On" : "Off"}
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Typing Sound</span>
                  <button
                    onClick={() => setTypingSound(!typingSound)}
                    className={`px-3 py-1 rounded-md text-sm font-semibold border transition-all cursor-pointer ${
                      typingSound
                        ? "bg-cyan-600 border-cyan-500 hover:bg-cyan-500"
                        : "bg-gray-700 border-gray-600 hover:bg-gray-500"
                    }`}
                  >
                    {typingSound ? "On" : "Off"}
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-300">
                    Volume: {(volume * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </>
            )}

            {/* 🎨 VISUAL TAB */}
            {activeTab === "visual" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-300">Text Color</label>
                  <select
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full bg-black/40 border border-cyan-400/30 rounded-md p-2 text-cyan-300 focus:outline-none cursor-pointer"
                  >
                    <option value="white" className="bg-black text-white">
                      Default
                    </option>
                    <option value="blue" className="bg-black neon-blue">
                      Blue
                    </option>
                    <option value="pink" className="bg-black neon-pink">
                      Pink
                    </option>
                    <option value="green" className="bg-black  neon-green">
                      Green
                    </option>
                    <option value="orange" className="bg-black neon-orange">
                      Orange
                    </option>
                    <option value="red" className="bg-black neon-red">
                      Red
                    </option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-300">
                    Background Blur: {blur}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={blur}
                    onChange={(e) => setBlur(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div
                  className={`border border-cyan-400/30 rounded-md p-3 text-center mt-2 bg-black/20 ${styleMap[textColor]}`}
                  style={{ backdropFilter: `blur(${blur}px)` }}
                >
                  <span className="relative z-10">Visual Preview</span>
                </div>
              </>
            )}

            {/* 🔤 FONT TAB */}
            {activeTab === "font" && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-300">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="24"
                    max="36"
                    step="1"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div
                  className="border border-cyan-400/30 rounded-md p-3 text-center mt-2 bg-black/20"
                  style={{
                    fontSize: `${fontSize}px`,
                    color: textColor === "white" ? "white" : "",
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                </div>
              </>
            )}

            {/* ⚙️ GENERAL TAB */}
            {activeTab === "general" && (
              <div className="flex flex-col gap-3 items-center w-full">
                <div className="w-full border border-cyan-500/30 rounded-md p-3 bg-black/30 flex flex-col gap-2">
                  <h3 className="text-cyan-400 font-semibold mb-2 text-base text-center">
                    Backend Connections
                  </h3>

                  <NetworkPing
                    id="main"
                    name="Main Backend Server"
                    url={`${import.meta.env.VITE_BACKEND_URL}/health`}
                  />
                  <NetworkPing
                    ide="quote"
                    name="Random Quote API"
                    url={`${import.meta.env.VITE_QUOTE_URL}/api/get/random/lower`}
                  />
                </div>

                <div className="w-full text-center border border-cyan-500/30 rounded-md p-3 bg-black/30">
                  <h3 className="text-cyan-400 font-semibold mb-1 text-base">
                    Reset Settings
                  </h3>
                  <p className="text-gray-300 text-xs mb-2">
                    Restore all settings to their default values.
                  </p>
                  <button
                    onClick={handleReset}
                    className="w-full bg-red-600 hover:bg-red-500 rounded-md py-1.5 text-xs font-semibold shadow-[0_0_12px_rgba(255,0,0,0.3)] transition-all cursor-pointer"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/home")}
                className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-md py-2 font-semibold text-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handleSaveSettings}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 rounded-md py-2 font-semibold text-sm shadow-[0_0_12px_rgba(0,255,255,0.3)] transition-all cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
