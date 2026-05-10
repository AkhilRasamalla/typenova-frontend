// src/store/useNetworkStore.js
import { create } from "zustand";
import axios from "axios";

const useNetworkStore = create((set, get) => ({
  servers: {
    main: { connected: false, lastChecked: null },
    quote: { connected: false, lastChecked: null },
  },

  checkConnection: async (key, url) => {
    try {
      const res = await axios.get(url);
      const isConnected = res?.status === 200;

      set((state) => ({
        servers: {
          ...state.servers,
          [key]: { connected: isConnected, lastChecked: Date.now() },
        },
      }));
    } catch {
      set((state) => ({
        servers: {
          ...state.servers,
          [key]: { connected: false, lastChecked: Date.now() },
        },
      }));
    }
  },

  // Optional helper to check all at once
  checkAllConnections: () => {
    const { checkConnection } = get();
    checkConnection("main", "/random/lower");
    checkConnection("quote", "/random/lower");
  },
}));

export default useNetworkStore;
