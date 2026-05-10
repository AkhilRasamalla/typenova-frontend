import React, { useState, useEffect } from "react";
import generateAvatar from "../utils/generateAvatat.js";
import generateName from "../utils/generateName.js";

const TestCase = () => {
  const [seed, setSeed] = useState("test123");
  const [avatarUrl, setAvatarUrl] = useState(generateAvatar(seed));
  const [name, setName] = useState(
    "Do the best you can until you know better. Then when you know better, do better."
  );
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      console.log("Available Voices:", availableVoices);
      setVoices(availableVoices);
      if (availableVoices.length > 0) setSelectedVoice(availableVoices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleGenerate = () => {
    const newSeed = Math.random().toString(36).substring(2, 10);
    setSeed(newSeed);
    setAvatarUrl(generateAvatar(newSeed));
    setName(generateName);
    console.log("Generated New Seed:", newSeed);
  };

  const handleSpeak = (text) => {
    if (!selectedVoice || !text) {
      console.warn("No voice selected or text is empty");
      return;
    }

    window.speechSynthesis.cancel(); // stop any previous speech

    const words = name.split(" ");
    let index = 0;

    const speakWord = () => {
      if (index >= words.length) {
        console.log("Finished speaking all words");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(words[index]);
      utterance.voice = selectedVoice;
      utterance.rate = 0.9; // slower
      utterance.pitch = 1.1;
      utterance.volume = 1;

      utterance.onstart = () => console.log("Speaking word:", words[index]);
      utterance.onend = () => {
        index++;
        setTimeout(speakWord, 500); // 500ms gap between words
      };

      window.speechSynthesis.speak(utterance);
    };

    speakWord();
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <img
        src={avatarUrl}
        alt="DiceBear Avatar"
        className="w-32 h-32 rounded-full border-2 border-cyan-400 shadow-lg"
      />
      <p className="text-black text-sm">Seed: {seed}</p>
      <h1 className="text-black mt-2">Name: {name}</h1>

      <button
        onClick={handleGenerate}
        className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-md text-white font-semibold"
      >
        Generate New Avatar
      </button>

      <div className="flex flex-col items-center gap-2 mt-4">
        <label className="text-black font-medium">Select Voice:</label>
        <select
          className="px-2 py-1 border rounded-md"
          value={selectedVoice ? selectedVoice.name : ""}
          onChange={(e) =>
            setSelectedVoice(voices.find((v) => v.name === e.target.value))
          }
        >
          {voices.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSpeak}
        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md text-white font-semibold mt-2"
      >
        Speak Name
      </button>
    </div>
  );
};

export default TestCase;
