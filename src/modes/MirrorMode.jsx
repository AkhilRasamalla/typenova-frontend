import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TypeInput from "../components/TypeInput.jsx";
import DifficultyPopUp from "../components/DifficultyPopUp";
import useQuoteStore from "../store/useQuoteStore.js";
import Loading from "../components/Loading.jsx";
import ServerError from "../components/ServerError.jsx";
import Results from "../components/Results.jsx";
import Images from "../constants/images.js";
import ConfirmPopUp from "../components/ConfirmPopUp.jsx";
import Descriptive from "../components/Descriptive.jsx";

const MirrorMode = () => {
  const navigate = useNavigate();

  const {
    fetchData,
    loading,
    error,
    quote,
    bestStats,
    saveMirrorStats,
  } = useQuoteStore();

  const mirrorBest = bestStats?.mirror || {
    wpm: 0,
    accuracy: 0,
    time: 0,
  };

  const [showIntro, setShowIntro] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStats, setCurrentStats] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleStartIntro = () => {
    setShowIntro(false);
    setShowPopup(true);
  };

  const handleConfirmDifficulty = async (difficultyParam) => {
    let selectedDifficulty = "";

    if (difficultyParam === "Easy") {
      selectedDifficulty = "lower";
    } else if (difficultyParam === "Medium") {
      selectedDifficulty = "upper";
    } else {
      selectedDifficulty = "mixed";
    }

    setDifficulty(selectedDifficulty);
    setShowPopup(false);

    await fetchData("", navigate, "/rush-mode");
  };

  const handleReset = async () => {
    await fetchData("", navigate, "/rush-mode");

    setIsComplete(false);
    setCurrentStats(null);
    setShowConfirm(false);
  };

  const handleExit = () => {
    setShowConfirm(false);
    navigate("/rush-mode");
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

      {showIntro && !isComplete && (
        <div className="relative z-20">
          <Descriptive
            title="🔁 Mirror Mode"
            description="Every word you type will appear reversed. Type fast and precise — your brain will fight back!"
            handleStart={handleStartIntro}
          />
        </div>
      )}

      {showPopup && (
        <div className="relative z-30">
          <DifficultyPopUp
            title="Mirror Mode"
            onConfirm={handleConfirmDifficulty}
            onCancel={() => navigate(-1)}
          />
        </div>
      )}

      {!showIntro && !showPopup && quote && (
        <div className="relative z-10 h-full">
          <TypeInput
            originalQuote={quote || ""}
            handleReset={handleReset}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            setIsComplete={setIsComplete}
            setCurrentStats={setCurrentStats}
            gameMode="mirror"
            difficulty={difficulty}
            bestStats={mirrorBest}
            saveStats={saveMirrorStats}
          />
        </div>
      )}

      {(isComplete || showConfirm) && (
        <div className="absolute inset-0 z-[9999] flex justify-center items-start bg-black/40 backdrop-blur-sm">
          {isComplete ? (
            <Results
              wpm={currentStats?.wpm || 0}
              accuracy={currentStats?.accuracy || 0}
              errors={currentStats?.errors || 0}
              time={currentStats?.time || 0}
              handleReset={handleReset}
              quitPath="/rush-mode"
            />
          ) : (
            <ConfirmPopUp
              handleExit={handleExit}
              setShowConfirm={setShowConfirm}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MirrorMode;