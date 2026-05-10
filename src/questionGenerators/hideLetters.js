const hideLetters = (text) => {
  const words = text.split(" ");

  const hiddenWords = words.map((word) => {
    if (word.length <= 3) return word; // skip very short words

    const chars = word.split("");
    const middle = chars.slice(1, -1);

    // Hide about 1 in every 3 middle letters
    const hiddenMiddle = middle.map((ch, i) => ((i + 1) % 3 === 0 ? "_" : ch));

    return chars[0] + hiddenMiddle.join("") + chars[chars.length - 1];
  });

  return hiddenWords.join(" ");
};

export default hideLetters;
