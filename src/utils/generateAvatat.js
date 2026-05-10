import { avatarSeeds } from "../constants/avatarSeeds.js";

const BASE_URL = "https://api.dicebear.com/9.x/bottts/svg?seed=";

const generateAvatar = (seed) => {
  const chosenSeed =
    seed || avatarSeeds[Math.floor(Math.random() * avatarSeeds.length)];

  return `${BASE_URL}${encodeURIComponent(chosenSeed)}`;
};

export default generateAvatar;