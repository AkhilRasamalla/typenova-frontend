import { create } from "zustand";
import axios from "axios";

const BACKEND_URL =
  "https://typenova-backend-on7p.onrender.com";

const useNetworkStore = create((set, get) => ({
  servers: {
    main: {
      connected: false,
      lastChecked: null,
    },

    quote: {
      connected: false,
      lastChecked: null,
    },
  },

  checkConnection: async (key, url) => {
    try {
      const res = await axios.get(url);

      const isConnected = res?.status === 200;

      set((state) => ({
        servers: {
          ...state.servers,
          [key]: {
            connected: isConnected,
            lastChecked: Date.now(),
          },
        },
      }));
    } catch (error) {
      console.error(
        `Connection failed for ${key}:`,
        error
      );

      set((state) => ({
        servers: {
          ...state.servers,
          [key]: {
            connected: false,
            lastChecked: Date.now(),
          },
        },
      }));
    }
  },

  checkAllConnections: async () => {
    const { checkConnection } = get();

    await checkConnection(
      "main",
      `${BACKEND_URL}/health`
    );

    await checkConnection(
      "quote",
      `${BACKEND_URL}/api/get`
    );
  },
}));

export default useNetworkStore;