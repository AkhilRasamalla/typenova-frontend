const adjectives = [
  "Swift",
  "Rapid",
  "Speedy",
  "Blazing",
  "Silent",
  "Steady",
  "Furious",
  "Wild",
  "Neon",
  "Sharp",
  "Cool",
  "Cyber",
  "Electric",
  "Mighty",
  "Ghost",
];

const nouns = [
  "Falcon",
  "Ninja",
  "Havoc",
  "Phantom",
  "Racer",
  "Storm",
  "Viper",
  "Flash",
  "Wolf",
  "Rogue",
  "Tiger",
  "Knight",
  "Shadow",
  "Strike",
  "Blitz",
];

const generateName = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
};

export default generateName;
