import { COLORS, randomChoice } from "../constants/colorPool.js";

const generateTypeColor = () => {
  const word = randomChoice(COLORS);
  let color = randomChoice(COLORS.filter((c) => c !== word));
  return {
    type: "typeColor",
    display: word,
    color,
    answer: color,
  };
};

export default generateTypeColor;