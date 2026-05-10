import React, { useEffect, useState, useRef } from "react";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const ColorClashCard = ({ data, round, total, onNext, multiplayer, handleExit }) => {
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const debounceRef = useRef(null);

  // ✅ Audio refs
  const tickRef = useRef(null);
  const correctRef = useRef(null);
  const wrongRef = useRef(null);

  const playSound = (ref) => {
    if (!ref?.current) return;
    const el = ref.current;
    el.currentTime = 0;
    el.volume = 0.6;
    el.play().catch(() => {});
  };

  const getQuestionPrompt = () => {
    switch (data?.type) {
      case "colorNoColor":
        return "Color or No Color? (color / no)";
      case "typeColor":
        return "Type the color";
      case "typeWord":
        return "Type the word";
      case "typeCorrectWord":
        return "Pick the correct word";
      case "typeDifferent":
        return "Find the odd one";
      default:
        return "Answer quickly!";
    }
  };

  useEffect(() => {
    setInput("");
    setIsWrong(false);
    setIsCorrect(false);
    setIsLocked(false);
    setTimeLeft(10);

    if (inputRef.current) inputRef.current.focus();
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);

          if (!isCorrect && !isLocked) {
            setIsWrong(true);
            playSound(wrongRef);
            setTimeout(() => {
              setIsWrong(false);
              onNext(false);
            }, 600);
          }
          return 0;
        }

        playSound(tickRef);

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [data]);

  useEffect(() => {
    if (!data?.answer || isLocked) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const normalized = input.trim().toLowerCase();
      const correct = data.answer.toLowerCase();

      if (!normalized) return;

      if (normalized === correct) {
        setIsLocked(true);
        setIsCorrect(true);
        setIsWrong(false);
        playSound(correctRef);
        setTimeout(() => onNext(true), 600);
      } else {
        setIsWrong(true);
        setTimeout(() => setIsWrong(false), 300);
      }
    }, 300);
  }, [input]);

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      <div
        className={`w-[420px] max-w-[90%] bg-black/40 backdrop-blur-md border rounded-2xl p-6 flex flex-col items-center gap-6 text-center text-white transition-all duration-300 ${
          isCorrect
            ? "border-green-500 bg-green-500/20"
            : isWrong
            ? "border-red-500 bg-red-500/20 animate-shake"
            : "border-cyan-500/40"
        }`}
      >
        <div className="flex items-center justify-between w-full text-sm text-gray-300">
          <span>
            Round {round} / {total}
          </span>
          <div className="flex items-center gap-5">
            <span
              className={`font-semibold text-base ${
                timeLeft <= 5 ? "text-red-400" : "text-cyan-400"
              }`}
            >
              00 : {String(timeLeft).padStart(2, "0")}
            </span>
            <button
              className="cursor-pointer px-2 py-1 bg-red-500/70 hover:bg-red-500 font-bold rounded-lg"
              onClick={() => (multiplayer ? handleExit() : navigate(-1))}
            >
              Exit
            </button>
          </div>
        </div>

        <p className="text-gray-200 text-lg font-bold mt-2">
          {getQuestionPrompt()}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 mt-2">
          {data.display && (
            <p
              className="text-4xl font-bold select-none"
              style={{ color: data.color }}
            >
              {data.display}
            </p>
          )}
          {data.options && (
            <div className="w-full flex gap-8">
              {data.options.map((opt, i) => (
                <p
                  key={i}
                  className="text-3xl font-semibold select-none"
                  style={{ color: opt.color }}
                >
                  {opt.word}
                </p>
              ))}
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          disabled={isLocked}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
          className={`p-2 w-[220px] text-center mt-2 text-md bg-transparent border-1 outline-none rounded-lg tracking-wide transition-all ${
            isWrong
              ? "border-red-500 text-red-400"
              : "border-cyan-400 text-cyan-200"
          }`}
        />

        <audio ref={tickRef} src="/sound/clock-tick.mp3" preload="auto" />
        <audio ref={correctRef} src="/sound/correct.mp3" preload="auto" />
        <audio ref={wrongRef} src="/sound/wrong.wav" preload="auto" />
      </div>
    </div>
  );
};

export default ColorClashCard;
