import { COLORS, randomChoice } from "../constants/colorPool.js";

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateTypeCorrectWord = () => {
  const correct = randomChoice(COLORS);

  const incorrectWord = randomChoice(COLORS.filter((c) => c !== correct));

  const incorrectColor = randomChoice(
    COLORS.filter((c) => c !== correct && c !== incorrectWord)
  );

  const options = shuffle([
    { word: correct, color: correct },
    { word: incorrectWord, color: incorrectColor },
  ]);

  return {
    type: "typeCorrectWord",
    options,
    answer: correct,
  };
};

export default generateTypeCorrectWord;
