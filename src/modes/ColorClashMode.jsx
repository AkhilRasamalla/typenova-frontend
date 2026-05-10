import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import socket from "../socket";
import ColorClashCard from "../components/ColorClashCard";
import { generateColorClashRound } from "../questionGenerators/generateColorClashRound";
import Loading from "../components/Loading";
import Images from "../constants/images";
import Descriptive from "../components/Descriptive";
import useGameStore from "../store/useGameStore.js";

const ColorClashMode = ({ multiplayer = null , handleExit}) => {
  const navigate = useNavigate();
  const { roomId, payload, gameMode } = useGameStore();
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (multiplayer) handleStart();

    return () => {
      socket.off("updateRound");
    };
  }, [multiplayer]);

  const handleStart = () => {
    setShowIntro(false);
    setLoading(true);

    if (multiplayer) {
      if (payload?.rounds) {
        const generated = generateColorClashRound(payload.rounds);
        setRounds(generated);
        setLoading(false);
      }
    } else {
      const generated = generateColorClashRound(20);
      setRounds(generated);
      setLoading(false);
    }
  };

  const handleNext = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);

    if (multiplayer) {
      // Update the current round progress for all players
      socket.emit("updateRound", {
        roomId,
        currentRound: currentRound + 1,
        isCorrect,
      });
    }

    setCurrentRound((prev) => {
      const nextRound = prev + 1;
      if (nextRound < rounds.length) {
        return nextRound;
      }
      setIsComplete(true);

      if (multiplayer && roomId) {
        socket.emit("playerFinished", {
          roomId,
        });
      }

      return prev;
    });
  };

  if (loading) return <Loading image={Images.QuickLoadImg} />;

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Images.InputImg})`,
          filter: "blur(6px)",
        }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {showIntro && !multiplayer && !isComplete && (
        <Descriptive
          title={" 🎨 Color Clash"}
          description={
            "Match the right color, word, or pattern before time runs out. Stay sharp — this game messes with your brain!"
          }
          handleStart={handleStart}
        />
      )}

      {!showIntro && !isComplete && rounds.length > 0 && (
        <ColorClashCard
          key={currentRound}
          data={rounds[currentRound]}
          round={currentRound + 1}
          total={rounds.length}
          onNext={handleNext}
          multiplayer={multiplayer}
          handleExit={handleExit}
        />
      )}

      {isComplete && !multiplayer && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white animate-fadeIn">
          <div className="w-[420px] max-w-[90%] bg-black/40 backdrop-blur-md border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.3)] rounded-2xl p-6 flex flex-col gap-5 text-center">
            <h2 className="text-2xl font-semibold text-cyan-400">
              🌈 Game Over
            </h2>
            <p className="text-gray-300 text-sm">
              You scored{" "}
              <span className="text-cyan-400 font-semibold">{score}</span> /{" "}
              {rounds.length}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="py-2 bg-cyan-600 hover:bg-cyan-500 rounded-md font-semibold text-sm shadow-[0_0_12px_rgba(0,255,255,0.3)] transition-all cursor-pointer"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate("/home")}
              className="py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold text-sm shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-all cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorClashMode;
