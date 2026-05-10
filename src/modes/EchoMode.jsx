import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypeInput from "../components/TypeInput.jsx";
import useQuoteStore from "../store/useQuoteStore.js";
import Loading from "../components/Loading.jsx";
import ServerError from "../components/ServerError.jsx";
import Results from "../components/Results.jsx";
import Images from "../constants/images.js";
import ConfirmPopUp from "../components/ConfirmPopUp.jsx";
import Descriptive from "../components/Descriptive.jsx";

const EchoMode = () => {
  const navigate = useNavigate();
  const { fetchData, loading, error, quote, bestStats, saveEchoStats } =
    useQuoteStore();

  const echoBest = bestStats?.echo || null;

  const [showIntro, setShowIntro] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStats, setCurrentStats] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Auto-fetch lowercase quote once intro is done
  const handleStartIntro = async () => {
    setShowIntro(false);
    await fetchData("/random/lower", navigate, "/echo-mode");
  };

  const handleReset = async () => {
    await fetchData("/random/lower", navigate, "/echo-mode");
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

      {/* INTRO SCREEN */}
      {showIntro && !isComplete && (
        <Descriptive
          title={"🎧 Echo Mode"}
          description={
            "Listen to the quote as it plays. Type what you hear — mistakes show in red. If you fall behind, hit reset to play it again."
          }
          handleStart={handleStartIntro}
        />
      )}

      {/* TYPING PHASE */}
      {!showIntro && quote && (
        <TypeInput
          originalQuote={quote}
          handleReset={handleReset}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          setIsComplete={setIsComplete}
          setCurrentStats={setCurrentStats}
          gameMode="Echo Mode"
          bestStats={echoBest}
          saveStats={saveEchoStats}
          handleExit={handleExit}
        />
      )}

      {/* RESULTS */}
      {isComplete && currentStats && (
        <Results
          wpm={currentStats.wpm}
          accuracy={currentStats.accuracy}
          errors={currentStats.errors}
          handleReset={handleReset}
          quitPath="/rush-mode"
        />
      )}

      {/* CONFIRM EXIT */}
      {showConfirm && (
        <ConfirmPopUp handleExit={handleExit} setShowConfirm={setShowConfirm} />
      )}
    </div>
  );
};

export default EchoMode;
