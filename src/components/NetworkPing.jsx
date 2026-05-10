import React, { useEffect, useState } from "react";
import useNetworkStore from "../store/useNetworkStore.js";

const NetworkPing = ({ name, url, id }) => {
  const { servers, checkConnection } = useNetworkStore();
  const connected = servers[id]?.connected;
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (connected || loading) return; 
    setLoading(true);
    await checkConnection(id, url);
    setLoading(false);
  };

  useEffect(() => {
    checkConnection(id, url); // initial check
    const interval = setInterval(() => checkConnection(id, url), 600000); // every 10 min
    return () => clearInterval(interval);
  }, [id, url, checkConnection]);

  return (
    <div className="w-full flex items-center justify-between border border-cyan-500/30 rounded-md p-3 bg-black/30">
      <span className="text-cyan-300 text-sm font-medium">{name}</span>

      <button
        onClick={handleCheck}
        disabled={connected || loading}
        className={`px-3 py-1 rounded-md text-sm font-semibold transition-all cursor-pointer
          ${
            connected
              ? "bg-green-600 text-white cursor-default"
              : loading
              ? "bg-yellow-600 text-white cursor-wait"
              : "bg-cyan-600 hover:bg-cyan-500 text-white"
          }`}
      >
        {loading ? "Connecting..." : connected ? "Connected" : "Connect"}
      </button>
    </div>
  );
};

export default NetworkPing;
