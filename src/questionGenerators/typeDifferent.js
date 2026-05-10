import { COLORS, randomChoice } from "../constants/colorPool.js";

// Utility: shuffle array
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateTypeDifferent = () => {
  // Step 1 — pick two matching pairs (word === color)
  const match1 = randomChoice(COLORS);
  const match2 = randomChoice(COLORS.filter((c) => c !== match1));

  // Step 2 — pick one mismatched pair (word ≠ color)
  const mismatchWord = randomChoice(COLORS);
  const mismatchColor = randomChoice(COLORS.filter((c) => c !== mismatchWord));

  // Step 3 — build shuffled options
  const options = shuffle([
    { word: match1, color: match1 },
    { word: match2, color: match2 },
    { word: mismatchWord, color: mismatchColor },
  ]);

  // Step 4 — find which word is the mismatched one
  const answerObj = options.find((opt) => opt.word !== opt.color);

  return {
    type: "typeDifferent",
    options,
    answer: answerObj.word.toLowerCase(), // lowercase to normalize input check
  };
};

export default generateTypeDifferent;

