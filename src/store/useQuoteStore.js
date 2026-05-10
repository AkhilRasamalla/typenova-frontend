import { create } from "zustand";
import api from "../axios";

const savedQuickPlayStats =
  JSON.parse(localStorage.getItem("quickPlayBest")) || {};
const savedMirrorStats = JSON.parse(localStorage.getItem("mirrorBest")) || {};
const savedReactionStats =
  JSON.parse(localStorage.getItem("reactionBest")) || {};
const savedMemoryStats = JSON.parse(localStorage.getItem("memoryBest")) || {};
const savedEchoStats = JSON.parse(localStorage.getItem("echoBest")) || {};

const useQuoteStore = create((set) => ({
  quote: null,
  loading: false,
  error: null,

  bestStats: {
    quickPlay: {
      wpm: savedQuickPlayStats.wpm || 0,
      accuracy: savedQuickPlayStats.accuracy || 0,
      time: savedQuickPlayStats.time || 0,
    },
    mirror: {
      wpm: savedMirrorStats.wpm || 0,
      accuracy: savedMirrorStats.accuracy || 0,
      errors: savedMirrorStats.errors || 0,
    },
    reaction: {
      wpm: savedReactionStats.wpm || 0,
      errors: savedReactionStats.errors || 0,
      reactionTime: savedReactionStats.reactionTime || 0,
    },
    memory: {
      wpm: savedMemoryStats.wpm || 0,
      errors: savedMemoryStats.errors || 0,
    },
    echo: {
      wpm: savedEchoStats.wpm || 0,
      accuracy: savedEchoStats.accuracy || 0,
      errors: savedEchoStats.errors || 0,
    },
  },

  saveQuickPlayStats: (currentStats) => {
    set((state) => {
      const best = state.bestStats.quickPlay;
      const newBest = {
        wpm: Math.max(currentStats.wpm, best.wpm),
        accuracy: Math.max(currentStats.accuracy, best.accuracy),
        time:
          best.time === 0
            ? currentStats.time
            : Math.min(currentStats.time, best.time),
      };

      localStorage.setItem("quickPlayBest", JSON.stringify(newBest));

      return {
        bestStats: { ...state.bestStats, quickPlay: newBest },
      };
    });
  },

  // Mirror MODE
  saveMirrorStats: (current) => {
    set((state) => {
      const prev = state.bestStats.mirror;
      const newBest = {
        wpm: Math.max(current.wpm, prev.wpm),
        accuracy: Math.max(current.accuracy, prev.accuracy),
        errors: Math.min(current.errors, prev.errors || current.errors),
      };
        localStorage.setItem("mirrorBest", JSON.stringify(newBest));
      return { bestStats: { ...state.bestStats, mirror: newBest } };
    });
  },

  // REACTION MODE
  saveReactionStats: (current) => {
    set((state) => {
      const prev = state.bestStats.reaction;
      const newBest = {
        wpm: Math.max(current.wpm || 0, prev.wpm),
        reactionTime:
          prev.reactionTime === 0
            ? current.reactionTime
            : Math.min(current.reactionTime, prev.reactionTime),
        errors: Math.min(current.errors, prev.errors || current.errors),
      };
      localStorage.setItem("reactionBest", JSON.stringify(newBest));
      return { bestStats: { ...state.bestStats, reaction: newBest } };
    });
  },

  // Memory MODE
  saveMemoryStats: (current) => {
    set((state) => {
      const prev = state.bestStats.memory;
      const newBest = {
        wpm: Math.max(current.wpm || 0, prev.wpm),
        errors: Math.min(current.errors, prev.errors || current.errors),
      };
      localStorage.setItem("blindBest", JSON.stringify(newBest));
      return { bestStats: { ...state.bestStats, memory: newBest } };
    });
  },

    // Echo MODE
  saveEchoStats: (current) => {
    set((state) => {
      const prev = state.bestStats.echo;  
      const newBest = {
        wpm: Math.max(current.wpm || 0, prev.wpm),
        accuracy: Math.max(current.accuracy || 0, prev.accuracy),
        errors: Math.min(current.errors, prev.errors || current.errors),
      };
      localStorage.setItem("echoBest", JSON.stringify(newBest));
      return { bestStats: { ...state.bestStats, echo: newBest } };
    });
  },  

  // -----------------------------
  // fetch quote from API
  fetchData: async (endpoint, navigate, redirectPath) => {
    set({ loading: true, error: null });

    const timeoutLimit = 35000;
    const timeoutId = setTimeout(() => {
      set({
        loading: false,
        error: "Server took too long to respond. Please try again.",
      });
      setTimeout(() => navigate(redirectPath), 2000);
    }, timeoutLimit);

    try {
      const response = await api.get(endpoint);
      clearTimeout(timeoutId);

      set({ quote: response.data.text, loading: false });
    } catch (err) {
      clearTimeout(timeoutId);

      set({
        error: "Server is inactive or unreachable...",
        loading: false,
      });

      setTimeout(() => navigate(redirectPath), 3000);
    }
  },
  // explicit setter for quote
  setQuote: (quote) => set({ quote }),
}));

export default useQuoteStore;
