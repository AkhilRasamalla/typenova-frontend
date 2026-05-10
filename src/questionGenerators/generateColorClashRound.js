import generateTypeWord from "./typeColor.js";
import generateTypeColor from "./typeColor.js";
import generateTypeCorrectWord from "./typeCorrectWord.js";
import generateColorNoColor from "./colorNoColor.js";
import generateTypeDifferent from "./typeDifferent.js";

const generators = [
  generateTypeWord,
  generateTypeColor,
  generateTypeCorrectWord,
  generateColorNoColor,
  generateTypeDifferent,
];

const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateRandomQuestion = () => {
  const generator = randomChoice(generators);
  return generator();
};

export const generateColorClashRound = (rounds = 10) => {
  const questions = [];

  for (let i = 0; i < rounds; i++) {
    questions.push({
      id: i + 1,
      ...generateRandomQuestion(),
    });
  }

  return questions;
};
