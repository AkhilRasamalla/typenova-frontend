import { COLORS, randomChoice } from "../constants/colorPool.js";

const generateColorNoColor = () => {
  const word = randomChoice(COLORS);
  const color = Math.random() > 0.5 ? word : randomChoice(COLORS.filter((c) => c !== word));
  const answer = word === color ? "no" : "color";

  return {
    type: "colorNoColor",
    display: word,
    color,
    answer,
  };
};

export default generateColorNoColor;
