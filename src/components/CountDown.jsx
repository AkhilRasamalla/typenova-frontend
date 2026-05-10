import React, { useEffect, useState, useRef } from "react";
import useSettingsStore from "../store/useSettingsStore";

const CountDown = ({ start = 3, onFinish }) => {
  const [count, setCount] = useState(start);
  const { volume } = useSettingsStore();

  const soundRef = useRef(null);

  const handleSound = () => {
    const sound = soundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play().catch(() => {});
    }
  };

  useEffect(() => {
    // Start the sound ONCE
    handleSound();

    // Update countdown every second
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setTimeout(() => onFinish());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black/50 text-white text-[6rem] font-bold animate-fadeIn z-50">
      {count > 0 ? count : "GO!"}

      <audio ref={soundRef} src="/sound/cd.mp3" preload="auto"></audio>
    </div>
  );
};

export default CountDown;
