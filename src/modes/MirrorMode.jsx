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
  const { fetchData, loading, error, quote, bestStats, saveMirrorStats } =
    useQuoteStore();

  const accuracyBest = bestStats?.mirror || null;

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
    const text =
      difficultyParam === "Easy"
        ? "lower"
        : difficultyParam === "Medium"
        ? "upper"
        : "mixed";
    setDifficulty(text);
    setShowPopup(false);
    const endpoint = `/random/${text}`;
    await fetchData(endpoint, navigate, "/rush-mode");
  };

  const handleReset = () => {
    fetchData(`/random/${difficulty}`, navigate, "/rush-mode");
    setIsComplete(false);
    setCurrentStats(null);
  };

  const handleExit = () => {
    setShowConfirm(false);
    navigate("/rush-mode");
  };

  if (loading) return <Loading image={Images.QuickLoadImg} />;
  if (error) return <ServerError error={error} />;

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 bg-cover bg-center blur-[6px]"
        style={{ backgroundImage: `url(${Images.InputImg})` }}
      />
      <div className="absolute inset-0 bg-black/85" />

      {showIntro && !isComplete && (
        <Descriptive
          title={"🔁 Mirror Mode"}
          description={
            "Every word you type will appear reversed.Type fast and precise — your brain will fight back!"
          }
          handleStart={handleStartIntro}
        />
      )}

      {showPopup && (
        <DifficultyPopUp
          title="Mirror Mode"
          onConfirm={handleConfirmDifficulty}
          onCancel={() => navigate(-1)}
        />
      )}

      {!showIntro && !showPopup && quote && (
        <TypeInput
          originalQuote={quote}
          handleReset={handleReset}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          setIsComplete={setIsComplete}
          setCurrentStats={setCurrentStats}
          gameMode="Mirror Mode"
          bestStats={accuracyBest}
          saveStats={saveMirrorStats}
          handleExit={handleExit}
        />
      )}

      {isComplete && currentStats && (
        <Results
          wpm={currentStats.wpm}
          accuracy={currentStats.accuracy}
          errors={currentStats.errors}
          handleReset={handleReset}
          quitPath="/rush-mode"
        />
      )}

      {showConfirm && (
        <ConfirmPopUp handleExit={handleExit} setShowConfirm={setShowConfirm} />
      )}
    </div>
  );
};

export default MirrorMode;
