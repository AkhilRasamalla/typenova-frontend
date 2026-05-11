import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import TypeInput from "../components/TypeInput.jsx";
import useQuoteStore from "../store/useQuoteStore.js";
import Results from "../components/Results.jsx";
import ConfirmPopUp from "../components/ConfirmPopUp.jsx";
import Loading from "../components/Loading.jsx";
import ServerError from "../components/ServerError.jsx";
import Images from "../constants/images.js";

const RandomRush = () => {
  const navigate = useNavigate();

  const {
    quote,
    loading,
    error,
    fetchData,
    bestStats,
    saveRandomRushStats,
  } = useQuoteStore();

  const [isComplete, setIsComplete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentStats, setCurrentStats] = useState(null);

  const randomRushBest = bestStats?.randomRush || {
    wpm: 0,
    accuracy: 0,
    time: 0,
  };

  useEffect(() => {
    fetchData("", navigate, "/home");
  }, []);

  const handleReset = () => {
    fetchData("", navigate, "/home");

    setShowConfirm(false);
    setIsComplete(false);
    setCurrentStats(null);
  };

  const handleExit = () => {
    setShowConfirm(false);
    navigate("/solo-play");
  };

  if (loading) {
    return <Loading image={Images.QuickLoadImg} />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-[6px]"
        style={{
          backgroundImage: `url(${Images.InputImg})`,
        }}
      />

      <div className="absolute inset-0 bg-black/85" />

      {(isComplete || showConfirm) && (
        <div className="absolute inset-0 z-[9999] flex justify-center items-start bg-black/40 backdrop-blur-sm">
          {isComplete ? (
            <Results
              handleReset={handleReset}
              wpm={currentStats?.wpm || 0}
              accuracy={currentStats?.accuracy || 0}
              time={currentStats?.time || 0}
              errors={currentStats?.errors || 0}
              quitPath="/solo-play"
            />
          ) : (
            <ConfirmPopUp
              handleExit={handleExit}
              setShowConfirm={setShowConfirm}
            />
          )}
        </div>
      )}

      <div className="relative z-10 h-full">
        <TypeInput
          originalQuote={quote || ""}
          handleReset={handleReset}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          setIsComplete={setIsComplete}
          setCurrentStats={setCurrentStats}
          gameMode="randomRush"
          bestStats={randomRushBest}
          saveStats={saveRandomRushStats}
        />
      </div>
    </div>
  );
};

export default RandomRush;