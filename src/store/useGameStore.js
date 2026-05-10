// useGameStore.js
import { create } from "zustand";

const useGameStore = create((set) => ({
  roomId: null,
  quote: null,
  gameMode: null,
  startTime: null,
  timeOffset: null,
  payload: null,

  setGameData: (data) =>
    set({
      roomId: data.roomId ?? null,
      quote: data.quote ?? null,
      gameMode: data.gameMode ?? null,
      startTime: data.startTime ?? null,
      timeOffset: data.timeOffset ?? 0,
      payload: data.payload ?? null,
    }),

  reset: () =>
    set({
      roomId: null,
      quote: null,
      gameMode: null,
      startTime: null,
      timeOffset: 0,
      payload: null,
    }),
}));

export default useGameStore;
