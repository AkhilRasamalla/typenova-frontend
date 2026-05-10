import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TypeInput from "../components/TypeInput.jsx";
import DifficultyPopUp from "../components/DifficultyPopUp.jsx";
import useQuoteStore from "../store/useQuoteStore.js";
import Loading from "../components/Loading.jsx";
import ServerError from "../components/ServerError.jsx";
import Results from "../components/Results.jsx";
import Images from "../constants/images.js";
import ConfirmPopUp from "../components/ConfirmPopUp.jsx";
import Descriptive from "../components/Descriptive.jsx";

const MemoryMode = () => {
  const navigate = useNavigate();
  const { fetchData, loading, error, quote, bestStats, saveMemoryStats } =
    useQuoteStore();

  const memoryBest = bestStats?.memory || null;

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
          title={"🧠 Memory Mode"}
          description={
            "Memorize the quote before it fades! After a few seconds, random letters will vanish — type from memory and test your brain’s recall speed."
          }
          handleStart={handleStartIntro}
        />
      )}

      {showPopup && (
        <DifficultyPopUp
          title="Memory Mode"
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
          gameMode="Memory Mode"
          bestStats={memoryBest}
          saveStats={saveMemoryStats}
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

export default MemoryMode;
