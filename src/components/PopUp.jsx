import React, { useEffect, useState } from "react";

const Popup = ({
  message = "Waiting for other players to finish...",
  duration = null,
  onAutoClose = null,
}) => {
  const [countdown, setCountdown] = useState(duration);

  // If duration is provided, auto-close after countdown
  useEffect(() => {
    if (!duration) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onAutoClose) onAutoClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onAutoClose]);

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white px-8 py-6 rounded-2xl shadow-lg text-center animate-pulse border border-gray-700">
        <p className="text-xl font-semibold mb-2">⏳ {message}</p>
        {duration && (
          <p className="text-sm text-gray-400">
            Returning to lobby in{" "}
            <span className="text-blue-400 font-bold">{countdown}</span> sec...
          </p>
        )}
      </div>
    </div>
  );
};

export default Popup;
