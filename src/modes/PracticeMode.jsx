import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import TypeInput from "../components/TypeInput.jsx";
import useQuoteStore from "../store/useQuoteStore.js";
import Results from "../components/Results.jsx";
import ConfirmPopUp from "../components/ConfirmPopUp.jsx";
import Loading from "../components/Loading.jsx";
import ServerError from "../components/ServerError.jsx";
import Images from "../constants/images.js";
import DifficultyPopUp from "../components/DifficultyPopUp.jsx";

const PracticeMode = () => {
  const { quote, loading, error, fetchData } = useQuoteStore();
  const [isComplete, setIsComplete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentStats, setCurrentStats] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    const endpoint = `/random/${difficulty}`;
    fetchData(endpoint, navigate, "/solo-play");
    setShowConfirm(false);
    setIsComplete(false);
  };

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleConfirmDifficulty = (difficultyParam) => {
    const text =
      difficultyParam === "Easy"
        ? "lower"
        : difficultyParam === "Medium"
        ? "upper"
        : "mixed";
    setDifficulty(text);
    setShowPopup(false);
    const endpoint = `/random/${text}`;
    fetchData(endpoint, navigate, "/solo-play");
  };

  const handleExit = () => {
    setShowConfirm(false);
    navigate("/solo-play");
  };

  if (loading) return <Loading image={Images.QuickLoadImg} />;
  if (error) return <ServerError error={error} />;

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute inset-0 bg-cover bg-center blur-[6px]`}
        style={{ backgroundImage: `url(${Images.InputImg})` }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {(isComplete || showConfirm || showPopup) && (
        <div className="absolute inset-0 z-[9999] flex justify-center items-start bg-black/40 backdrop-blur-sm">
          {isComplete && currentStats && (
            <Results
              handleReset={handleReset}
              wpm={currentStats.wpm}
              accuracy={currentStats.accuracy}
              time={currentStats.time}
              errors={currentStats.errors}
              quitPath={"/solo-play"}
            />
          )}

          {showPopup && (
            <DifficultyPopUp
              title="Practice Mode"
              onConfirm={handleConfirmDifficulty}
              onCancel={() => navigate(-1)}
            />
          )}

          {showConfirm && (
            <ConfirmPopUp
              handleReset={handleReset}
              setShowConfirm={setShowConfirm}
              handleExit={handleExit}
            />
          )}
        </div>
      )}

      <div className="relative h-full z-10">
        {
          <TypeInput
            originalQuote={quote}
            handleReset={handleReset}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            setIsComplete={setIsComplete}
            bestStats={null}
            saveStats={null}
            gameMode="Practice Mode"
            setCurrentStats={setCurrentStats}
          />
        }
      </div>
    </div>
  );
};

export default PracticeMode;
