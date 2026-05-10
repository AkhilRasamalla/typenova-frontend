import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Images from "../constants/images.js";
import useSettingsStore from "../store/useSettingsStore";
import { ImInfo } from "react-icons/im";
import { BsRobot } from "react-icons/bs";

const Home = () => {
  const navigate = useNavigate();
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);

  const { hoverSound, volume, blur } = useSettingsStore();

  const [hoverEnabled, setHoverEnabled] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showServerTip, setShowServerTip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setHoverEnabled(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (path) => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.volume = volume; // ✅ Respect volume
      if (hoverSound) {
        // ✅ Only play if hover/click sound enabled
        clickSoundRef.current
          .play()
          .then(() => {
            setTimeout(() => navigate(path), 150);
          })
          .catch(() => navigate(path));
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  const handleHover = () => {
    if (!hoverEnabled || !hoverSound) return;
    const sound = hoverSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play().catch(() => {});
    }
  };

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute top-[3%] left-[3%] z-20 rounded-full"
        onClick={() => setShowServerTip((s) => !s)}
      >
        <div className="relative group rounded-full">
          <BsRobot
            size={30}
            className="text-cyan-300 cursor-pointer transition-colors rounded-full "
          />

          <div
            className={`absolute left-0 mt-2 w-64 p-3 bg-black/80 text-white text-sm leading-relaxed rounded-md border border-white/20 transition-opacity space-y-2 group-hover:opacity-100
        ${showServerTip ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
          >
            <div>
              <span className="font-semibold text-cyan-300">Tip</span>
              <p className="mt-1">
                Make sure servers are connected. Check in the settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-[3%] right-[3%] z-20 rounded-full"
        onClick={() => setShowInfo((s) => !s)}
      >
        <div className="relative group glow-hover rounded-full">
          <ImInfo
            size={30}
            className="text-cyan-300 cursor-pointer transition-colors rounded-full"
          />

          <div
            className={` absolute right-0 mt-2 w-64 p-3 bg-black/80 text-white text-sm leading-relaxed rounded-md border border-white/20 transition-opacity space-y-2 group-hover:opacity-100
            ${showInfo ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          >
            <div>
              <span className="font-semibold text-cyan-300">About the App</span>
              <p className="mt-1">
                Multiple typing modes, real-time stats, Echo Mode, multiplayer,
                and full UI customization. Designed to feel fast, simple, and
                distraction-free.
              </p>
            </div>

            <div>
              <span className="font-semibold text-cyan-300">
                Signature Theme
              </span>
              <p className="mt-1">
                The interface uses a clean cyberpunk-style glow theme — sharp
                neon edges, dark surfaces, and bright accent colors for a
                focused, futuristic feel.
              </p>
            </div>

            <div className="border-t border-white/10 pt-2">
              <span className="font-semibold text-cyan-300">
                About the Developer
              </span>
              <p className="mt-1">
                Built from scratch — UI, game logic, audio features, and overall
                design. If you want to reach me:
              </p>
              <p className="text-cyan-200 font-medium">
                adhitya.contactme@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Images.HomeImg})`,
          filter: `blur(${blur}px)`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <ul className="uppercase font-bold space-y-3 text-center tracking-wider text-[var(--accent-color)] border-[var(--accent-color)] text-xl">
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onClick={() => handleClick("/quick-play")}
            onMouseEnter={handleHover}
          >
            Quick play
          </li>
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onClick={() => handleClick("/rush-mode")}
            onMouseEnter={handleHover}
          >
            Rush mode
          </li>
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onClick={() => handleClick("/multiplayer")}
            onMouseEnter={handleHover}
          >
            Multiplayer
          </li>
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onClick={() => handleClick("/solo-play")}
            onMouseEnter={handleHover}
          >
            Solo play
          </li>
          <li
            className="px-13 py-5 border-2 glow-hover glow-blue cursor-pointer"
            onClick={() => handleClick("/settings")}
            onMouseEnter={handleHover}
          >
            Settings
          </li>
        </ul>
      </div>

      <audio ref={hoverSoundRef} src="/sound/hover.wav" preload="auto"></audio>
      <audio ref={clickSoundRef} src="/sound/click.wav" preload="auto"></audio>
    </div>
  );
};

export default Home;
