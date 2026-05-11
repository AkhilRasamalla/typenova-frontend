import React, { useRef, useState, useEffect } from "react";
import Bar from "./Bar.jsx";
import useSettingsStore from "../store/useSettingsStore.js";
import socket from "../socket.js";
import hideLetters from "../questionGenerators/hideLetters.js";
import useGameStore from "../store/useGameStore.js";

const TypeInput = (props) => {
  const {
    originalQuote,
    roomId,
    multiplayer = null,
    gameMode,
    handleReset,
    showConfirm,
    setShowConfirm,
    setIsComplete,
    setCurrentStats,
    bestStats,
    saveStats,
    setWaiting,
  } = props;

  const [quote, setQuote] = useState("");
  const [words, setWords] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [status, setStatus] = useState({});
  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // memory mode
  const [hiddenQuote, setHiddenQuote] = useState("");

  // echo mode
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState(null);
  const cancelSpeechRef = useRef(false);
  const [revealedQuote, setRevealedQuote] = useState("");

  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);
  const keySoundRef = useRef(null);
  const [startTime, setStartTime] = useState(null);

  const { typingSound, volume, textColor, fontSize } =
    useSettingsStore();

  let wpm, accuracy, time, reactionTime, errors;

  if (!multiplayer && bestStats) {
    ({ wpm, accuracy, time, reactionTime, errors } = bestStats);
  }

  useEffect(() => {
    return () => {
      useGameStore.getState().reset();
    };
  }, []);

  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, []);

  // SAFE QUOTE SETUP
  useEffect(() => {
    const safeQuote = originalQuote || "";

    setQuote(safeQuote);
    setWords(safeQuote.split(" "));
    setStatus({});
    setIndex(0);
    setHiddenQuote("");
    setRevealedQuote("");
  }, [originalQuote]);

  // Echo Mode Setup
  useEffect(() => {
    if (gameMode === "Echo Mode" && originalQuote) {
      const arr = (originalQuote || "")
        .split("")
        .map((ch, i) =>
          ch === " " ? " " : i === 0 ? ch : "_"
        )
        .join("");

      setRevealedQuote(arr);
    }
  }, [gameMode, originalQuote]);

  // Echo Auto Speak
  useEffect(() => {
    if (gameMode === "Echo Mode" && originalQuote && voice) {
      const timer = setTimeout(() => {
        if (!isSpeaking) {
          speakQuote();
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [gameMode, originalQuote, voice, isSpeaking]);

  // Memory Mode
  useEffect(() => {
    if (gameMode === "Memory Mode" && originalQuote) {
      setHiddenQuote(originalQuote);

      const timer = setTimeout(() => {
        setHiddenQuote(hideLetters(originalQuote));
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [gameMode, originalQuote]);

  // Mirror Mode
  const reverseWords = (text) =>
    (text || "")
      .split(" ")
      .map((w) => [...w].reverse().join(""))
      .join(" ");

  const mirroredQuote =
    gameMode === "Mirror Mode"
      ? reverseWords(originalQuote || "")
      : originalQuote || "";

  useEffect(() => {
    if (!showConfirm && inputRef.current) {
      handleFocus();
    }
  }, [showConfirm]);

  // Load Voice
  useEffect(() => {
    if (gameMode !== "Echo Mode") return;

    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;

    if (!synth) return;

    const loadVoice = () => {
      const voices = synth.getVoices() || [];

      const englishVoice =
        voices.find(
          (v) =>
            v.lang &&
            v.lang.startsWith("en") &&
            v.name &&
            v.name.includes("Google")
        ) ||
        voices.find(
          (v) =>
            v.lang &&
            v.lang.startsWith &&
            v.lang.startsWith("en")
        ) ||
        voices[0];

      setVoice(englishVoice || null);
    };

    loadVoice();

    synth.onvoiceschanged = loadVoice;

    return () => {
      synth.cancel();
      synth.onvoiceschanged = null;
    };
  }, [gameMode]);

  useEffect(() => {
    if (gameMode !== "Echo Mode") {
      cancelSpeech();
    }
  }, [gameMode]);

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }

    setIndex(0);
    setIsFocused(true);

    inputRef.current?.focus();

    setStartTime(Date.now());

    setStatus({});
  };

  const handleFocus = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  // SPEAK FUNCTION
  const speakQuote = () => {
    if (gameMode !== "Echo Mode") return;
    if (!originalQuote) return;
    if (!voice) return;

    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;

    if (!synth) return;

    synth.cancel();

    cancelSpeechRef.current = false;

    setIsSpeaking(true);

    const wordsArr = (originalQuote || "").split(" ");

    const speakWord = (word) =>
      new Promise((resolve) => {
        if (cancelSpeechRef.current) {
          return resolve();
        }

        const utterance =
          new SpeechSynthesisUtterance(word);

        utterance.voice = voice;
        utterance.rate = 0.95;
        utterance.pitch = 0.95;
        utterance.volume = 1;

        utterance.onend = resolve;

        synth.speak(utterance);
      });

    const startSpeaking = async () => {
      for (let i = 0; i < wordsArr.length; i++) {
        if (cancelSpeechRef.current) {
          break;
        }

        await speakWord(wordsArr[i]);

        await new Promise((r) =>
          setTimeout(r, 2500)
        );
      }

      setIsSpeaking(false);
    };

    startSpeaking();
  };

  // CANCEL SPEECH
  const cancelSpeech = () => {
    cancelSpeechRef.current = true;

    if (typeof window !== "undefined") {
      const synth = window.speechSynthesis;

      if (synth) {
        synth.cancel();
      }
    }

    setIsSpeaking(false);
  };

  const displayWords =
    gameMode === "Mirror Mode"
      ? mirroredQuote.split(" ")
      : gameMode === "Memory Mode"
      ? (hiddenQuote || originalQuote || "").split(" ")
      : gameMode === "Echo Mode"
      ? (revealedQuote || originalQuote || "").split(" ")
      : words;

  const originalWords =
    (originalQuote || "").split(" ");

  const getIndex = (w, c) =>
    originalWords
      .slice(0, w)
      .reduce((sum, word) => sum + word.length + 1, 0) +
    c;

  const checkValid = (e) => {
    const sound = keySoundRef.current;

    if (typingSound && sound) {
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play().catch(() => {});
    }

    const char = e.target.value.slice(-1);

    if (!char) return;

    if (!originalQuote) {
      e.target.value = "";
      return;
    }

    const currIndex = index;

    const expectedChar =
      originalQuote[currIndex] || "";

    if (char === " ") {
      if (expectedChar === " ") {
        setStatus((prev) => {
          if (prev[currIndex] === "wrong") {
            return prev;
          }

          return {
            ...prev,
            [currIndex]: "correct",
          };
        });

        setIndex(currIndex + 1);
      }

      e.target.value = "";

      const newProgressSpace =
        ((currIndex + 1) / (originalQuote || "").length) *
        100;

      setProgress(newProgressSpace);

      if (multiplayer && roomId) {
        socket.emit("updateProgress", {
          roomId,
          progress: newProgressSpace,
        });
      }

      if (currIndex >= (originalQuote || "").length - 1) {
        finishRun();
      }

      return;
    }

    const correct = char === expectedChar;

    setStatus((prev) => {
      if (prev[currIndex] === "wrong") {
        return prev;
      }

      return {
        ...prev,
        [currIndex]: correct ? "correct" : "wrong",
      };
    });

    if (gameMode === "Echo Mode") {
      setRevealedQuote((prev) => {
        const chars = (
          prev || originalQuote || ""
        ).split("");

        chars[currIndex] =
          originalQuote[currIndex];

        return chars.join("");
      });

      setIndex(currIndex + 1);
    } else {
      if (correct) {
        setIndex(currIndex + 1);
      }
    }

    e.target.value = "";

    const newProgress =
      ((currIndex + 1) / (originalQuote || "").length) *
      100;

    setProgress(newProgress);

    if (multiplayer && roomId) {
      socket.emit("updateProgress", {
        roomId,
        progress: newProgress,
      });
    }

    if (currIndex >= (originalQuote || "").length - 1) {
      finishRun();
    }
  };

  const finishRun = () => {
    const typedChars = (quote || "").length;

    const errors = Object.values(status).filter(
      (s) => s === "wrong"
    ).length;

    const endTime = Date.now();

    const elapsed = Math.max(
      1,
      (endTime - (startTime || endTime)) / 1000
    );

    const wpmLocal =
      typedChars / 5 / (elapsed / 60);

    const accuracyLocal =
      typedChars === 0
        ? 0
        : ((typedChars - errors) / typedChars) * 100;

    if (!multiplayer) {
      const currentData = {
        wpm: wpmLocal,
        accuracy: accuracyLocal,
        errors,
        time: elapsed,
      };

      if (saveStats) {
        saveStats(currentData);
      }

      setCurrentStats(currentData);
    }

    if (multiplayer && roomId) {
      socket.emit("playerFinished", {
        roomId,
        wpm: wpmLocal,
        accuracy: accuracyLocal,
        time: elapsed,
      });

      if (gameMode === "Tournament") {
        setWaiting(true);
      }
    }

    setIsComplete(true);
  };

  const styleMap = {
    white: "text-white",
    blue: "neon-blue",
    pink: "neon-pink",
    green: "neon-green",
    orange: "neon-orange",
    red: "neon-red",
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="relative h-full w-full flex flex-col">

        {/* TOP BAR */}
        <div className="w-full pt-24 px-6 md:px-16 lg:px-28">
          <Bar
            {...{
              wpm,
              accuracy,
              time,
              errors,
              reactionTime,
              handleReset,
              setShowConfirm,
              multiplayer,
              gameMode,
              handleFocus,
            }}
            isSpeaking={isSpeaking}
            onReplay={speakQuote}
            onStop={cancelSpeech}
            onRefocus={handleFocus}
          />
        </div>

        {/* QUOTE AREA */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-16 lg:px-28 pb-24">
          <div
            className={`
              w-full
              max-w-6xl
              tracking-wider
              font-extralight
              break-words
              ${styleMap[textColor]}
            `}
            onClick={handleFocus}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: "1.9",
            }}
          >
            {displayWords.map((word, w) => (
              <span key={w}>
                {(word || "").split("").map((ch, c) => {
                  const i = getIndex(w, c);

                  const focus =
                    isFocused && index === i;

                  const colorClass =
                    status[i] === "wrong"
                      ? "text-red-400"
                      : status[i] === "correct"
                      ? "text-gray-500"
                      : "";

                  const hiddenByEcho =
                    gameMode === "Echo Mode" &&
                    revealedQuote &&
                    revealedQuote[i] === "_";

                  return (
                    <span
                      key={i}
                      className={`
                        transition-all duration-200
                        ${
                          focus
                            ? "border-b-2 border-white"
                            : ""
                        }
                        ${colorClass}
                        ${
                          hiddenByEcho
                            ? "opacity-0"
                            : "opacity-100"
                        }
                      `}
                    >
                      {ch}
                    </span>
                  );
                })}

                {w < displayWords.length - 1 && (
                  <span>&nbsp;</span>
                )}
              </span>
            ))}

            <input
              type="text"
              className="absolute opacity-0 pointer-events-none"
              ref={inputRef}
              onInput={checkValid}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        {/* START OVERLAY */}
        {!hasStarted &&
          !multiplayer &&
          gameMode !== "Color Clash" && (
            <div
              className="absolute inset-0 flex items-center justify-center backdrop-blur-sm cursor-pointer z-50"
              onClick={handleStart}
            >
              <p className="text-2xl md:text-3xl neon-blue">
                Click Here To Start
              </p>
            </div>
          )}

        <audio
          ref={keySoundRef}
          src="/sound/key-stroke2.wav"
          preload="auto"
        />
      </div>
    </div>
  );
};

export default TypeInput;