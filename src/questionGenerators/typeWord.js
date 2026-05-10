import { COLORS, randomChoice } from "../constants/colorPool.js";

const generateTypeWord = () => {
  const word = randomChoice(COLORS);
  let color = randomChoice(COLORS.filter((c) => c !== word));
  return {
    type: "typeWord",
    display: word,
    color,
    answer: word,
  };
};

export default generateTypeWord;
