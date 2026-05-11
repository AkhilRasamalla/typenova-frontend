import React, { useEffect, useRef, useState } from "react";

const TypeInput = ({
  currentWord,
  typedWord,
  setTypedWord,
  handleSubmit,
  isGameActive,
  selectedVoice,
}) => {
  const inputRef = useRef(null);

  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (isGameActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameActive]);

  // SAFE speech synthesis setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;

    if (!synth) return;

    const loadVoices = () => {
      const availableVoices = synth.getVoices() || [];
      setVoices(availableVoices);
    };

    loadVoices();

    synth.onvoiceschanged = loadVoices;

    return () => {
      if (synth) {
        synth.onvoiceschanged = null;
      }
    };
  }, []);

  const speakWord = (word) => {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;

    if (!synth) return;

    if (!word) return;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(word);

    const voice =
      voices.find((v) => v.name === selectedVoice) || voices[0];

    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    synth.speak(utterance);
  };

  const cancelSpeech = () => {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;

    if (synth) {
      synth.cancel();
    }
  };

  useEffect(() => {
    if (currentWord) {
      speakWord(currentWord);
    }

    return () => {
      cancelSpeech();
    };
  }, [currentWord]);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="text-3xl md:text-5xl font-bold text-cyan-300 tracking-widest">
        {currentWord}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={typedWord}
        onChange={(e) => setTypedWord(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        disabled={!isGameActive}
        autoComplete="off"
        spellCheck="false"
        className="w-[90%] md:w-[500px] bg-black/40 border-2 border-cyan-400 text-white text-center text-xl px-4 py-3 rounded-xl outline-none backdrop-blur-md"
        placeholder="Type here..."
      />
    </div>
  );
};

export default TypeInput;