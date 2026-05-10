import React from "react";
import api from "../axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TypeInput from "../components/TypeInput.jsx";
import useQuoteStore from "../store/useQuoteStore.js";
import Results from "../components/Results.jsx";
import ConfirmPopUp from "../components/ConfirmPopUp.jsx";
import Loading from "../components/Loading.jsx";
import ServerError from "../components/ServerError.jsx";
import Images from "../constants/images.js";

const RandomRush = () => {
  const { quote, loading, error, fetchData } = useQuoteStore();
  const [soundOn, setSoundOn] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentStats, setCurrentStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("/random", navigate, "/home");
  }, []);

  const handleReset = () => {
    fetchData("/random", navigate, "/home");
    setShowConfirm(false);
    setIsComplete(false);
  };

  const handleExit = () => {
    setShowConfirm(false);
    navigate("/solo-play");
  };

  // 🌀 Loading Screen
  if (loading) {
    return <Loading image={Images.QuickLoadImg}/>;
  }

  // ⚠️ Error Screen
  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <div className="relative h-full w-full">
      <div className={`absolute inset-0  bg-cover bg-center blur-[6px]`} style={{ backgroundImage: `url(${Images.InputImg})` }}/>
      <div className="absolute inset-0 bg-black/80" />

      {(isComplete || showConfirm) && (
        <div className="absolute inset-0 z-[9999] flex justify-center items-start pt-26  bg-black/40 backdrop-blur-sm">
          {isComplete && (
            <div className="z-50">
              <Results
                handleReset={handleReset}
                wpm={currentStats.wpm}
                accuracy={currentStats.accuracy}
                time={currentStats.time}
                errors={currentStats.errors}
                quitPath={"solo-play"}
              />
            </div>
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
        <TypeInput
          originalQuote={quote}
          handleReset={handleReset}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          setIsComplete={setIsComplete}
          setCurrentStats={setCurrentStats}
        />
      </div>
    </div>
  );
};

export default RandomRush;
