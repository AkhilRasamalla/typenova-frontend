import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import socket from "../socket.js";

import CountDown from "../components/CountDown.jsx";
import TypeInput from "../components/TypeInput.jsx";
import ColorClashMode from "./ColorClashMode.jsx";
import Loading from "../components/Loading.jsx";
import LeaderBoard from "../components/LeaderBoard.jsx";
import OverAllResults from "../components/OverAllResults.jsx";
import Popup from "../components/PopUp.jsx";
import ConfirmPopUp from "../components/ConfirmPopUp.jsx";
import Images from "../constants/images.js";
import useGameStore from "../store/useGameStore.js";

const MultiPlayerMode = () => {
  const navigate = useNavigate();
  const { roomId, startTime, payload, gameMode, timeOffset } = useGameStore();

  const [players, setPlayers] = useState([]);
  const [showCountdown, setShowCountdown] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const countdownDelayRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("getRoomState", { roomId });

    const handleRoomState = ({ players }) => {
      setPlayers(players || []);
    };

    socket.on("roomState", handleRoomState);
    return () => socket.off("roomState", handleRoomState);
  }, [roomId]);

  useEffect(() => {
    if (!startTime) return;

    const countdownSeconds = 3;
    const delay =
      startTime - (Date.now() + (timeOffset || 0)) - countdownSeconds * 1000;

    if (countdownDelayRef.current) clearTimeout(countdownDelayRef.current);

    countdownDelayRef.current = setTimeout(
      () => setShowCountdown(true),
      Math.max(delay, 0)
    );

    return () => clearTimeout(countdownDelayRef.current);
  }, [startTime]);

  useEffect(() => {
    const handleGameOver = (data) => {
      setGameOver(true);
      setResults(data);
      setWaiting(false);
    };

    const handleWaiting = () => setWaiting(true);

    socket.on("gameOver", handleGameOver);
    socket.on("waitingForOthers", handleWaiting);

    return () => {
      socket.off("gameOver", handleGameOver);
      socket.off("waitingForOthers", handleWaiting);
    };
  }, []);

  const handleCountdownFinish = () => {
    setShowCountdown(false);
    setStartTyping(true);
  };

  const handleExit = () => {
    setShowConfirm(false);
    socket.emit("leaveRoom", { roomId });
    navigate("/multiplayer");
  };

  const renderGameMode = () => {
    if (gameMode === "Color Clash") {
      return <ColorClashMode multiplayer={true} handleExit={handleExit} />;
    }

    if (
      [
        "Race",
        "Tournament",
        "Mirror Mode",
        "Memory Mode",
        "Echo Mode",
      ].includes(gameMode)
    ) {
      return (
        <TypeInput
          multiplayer={true}
          roomId={roomId}
          originalQuote={payload.quote}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          gameMode={gameMode}
          setWaiting={setWaiting}
          setIsComplete={() => {}}
        />
      );
    }

    return <Loading image={Images.LobbyLoadImg} />;
  };

  return (
    <div className="relative h-full w-full text-white flex flex-col justify-center items-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[6px]"
        style={{ backgroundImage: `url(${Images.InputImg})` }}
      />
      <div className="absolute inset-0 bg-black/85" />

      {showConfirm && (
        <ConfirmPopUp handleExit={handleExit} setShowConfirm={setShowConfirm} />
      )}

      {startTyping && <LeaderBoard players={players} socketId={socket.id} />}

      {gameOver && results && (
        <OverAllResults
          allPlayers={results.allPlayers}
          gameMode={results.gameMode}
          onClose={() => navigate("/multiplayer")}
        />
      )}

      {/* Main Game Content */}
      <div className="relative h-full z-10 flex flex-col items-center gap-6 w-full">
        {showCountdown ? (
          <CountDown start={3} onFinish={handleCountdownFinish} />
        ) : startTyping ? (
          <>
            {renderGameMode()}
            {waiting && <Popup />}
          </>
        ) : (
          <Loading image={Images.LobbyLoadImg} />
        )}
      </div>
    </div>
  );
};

export default MultiPlayerMode;
