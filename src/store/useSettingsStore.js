import { create } from "zustand";
import generateAvatar from "../utils/generateAvatat.js";
import generateName from "../utils/generateName.js";
import { avatarSeeds } from "../constants/avatarSeeds.js";


const savedSettings = JSON.parse(localStorage.getItem("userSettings")) || {};

if (!savedSettings.avatarSeed) {
  const randomSeed =
    avatarSeeds[Math.floor(Math.random() * avatarSeeds.length)];

  savedSettings.avatarSeed = randomSeed;
  savedSettings.avatarUrl = generateAvatar(randomSeed);
  savedSettings.name = generateName();

  localStorage.setItem("userSettings", JSON.stringify(savedSettings));
}

const useSettingsStore = create((set) => ({
  // --- AUDIO SETTINGS ---
  hoverSound: savedSettings.hoverSound ?? true,
  typingSound: savedSettings.typingSound ?? true,
  volume: savedSettings.volume ?? 0.7,

  // --- VISUAL SETTINGS ---
  textColor: savedSettings.textColor ?? "white",
  blur: savedSettings.blur ?? 2,

  // --- FONT SETTINGS ---
  fontSize: savedSettings.fontSize ?? 28,

  // --- USER PROFILE ---
  name: savedSettings.name,
  avatarSeed: savedSettings.avatarSeed,
  avatarUrl: savedSettings.avatarUrl,

  // --- FUNCTIONS ---
  setHoverSound: (val) => set({ hoverSound: val }),
  setTypingSound: (val) => set({ typingSound: val }),
  setVolume: (val) => set({ volume: val }),

  setTextColor: (val) => set({ textColor: val }),
  setBlur: (val) => set({ blur: val }),
  setFontSize: (val) => set({ fontSize: val }),

  setName: (name) => set({ name }),
  setAvatar: (seed) =>
    set({
      avatarSeed: seed,
      avatarUrl: generateAvatar(seed),
    }),

  resetSettings: () => {
    const newSeed = avatarSeeds[Math.floor(Math.random() * avatarSeeds.length)];
    const newName = generateName();

    const reset = {
      hoverSound: true,
      typingSound: true,
      volume: 0.7,
      textColor: "white",
      blur: 2,
      fontSize: 24,
      name: newName,
      avatarSeed: newSeed,
      avatarUrl: generateAvatar(newSeed),
    };

    localStorage.setItem("userSettings", JSON.stringify(reset));
    set(reset);
  },
}));

// persist to localStorage
useSettingsStore.subscribe((state) => {
  localStorage.setItem(
    "userSettings",
    JSON.stringify({
      hoverSound: state.hoverSound,
      typingSound: state.typingSound,
      volume: state.volume,
      textColor: state.textColor,
      blur: state.blur,
      fontSize: state.fontSize,
      name: state.name,
      avatarSeed: state.avatarSeed,
      avatarUrl: state.avatarUrl,
    })
  );
});

export default useSettingsStore;
