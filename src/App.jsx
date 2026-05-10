import React from "react";
import { Routes, Route } from "react-router";
import { useEffect } from "react";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import QuickPlay from "./pages/QuickPlay.jsx";
import RushMode from "./pages/RushMode.jsx";
import Multiplayer from "./pages/Multiplayer.jsx";
import SoloPlay from "./pages/SoloPlay.jsx";
import Home from "./pages/Home.jsx";
import PracticeMode from "./modes/PracticeMode.jsx";
import RandomRush from "./modes/RandomRush.jsx";
import MultiPlayerMode from "./modes/MultiPlayerMode.jsx";
import Lobby from "./components/Lobby.jsx";
import Settings from "./pages/Settings.jsx";
import ColorClashMode from "./modes/ColorClashMode.jsx";
import MirrorMode from "./modes/MirrorMode.jsx";
import MemoryMode from "./modes/MemoryMode.jsx";
import TestCase from "./components/TestCase.jsx";
import EchoMode from "./modes/EchoMode.jsx";
import useNetworkStore from "./store/useNetworkStore.js";

const App = () => {
  const { checkAllConnections } = useNetworkStore();

  useEffect(() => {
    const unlock = () => {
      document.querySelectorAll("audio").forEach((a) => a.play().then(a.pause));
      window.removeEventListener("click", unlock);
    };
    window.addEventListener("click", unlock);
  }, []);

  useEffect(() => {
    checkAllConnections();
  }, []);


  return (
    <div className="h-[100dvh] w-full">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quick-play" element={<QuickPlay />} />
        <Route path="/rush-mode" element={<RushMode />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/solo-play" element={<SoloPlay />} />
        <Route path="/practice-mode" element={<PracticeMode />} />
        <Route path="/random-rush" element={<RandomRush />} />
        <Route path="/multi-mode" element={<MultiPlayerMode />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/testcase" element={<TestCase />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/rush/color-clash" element={<ColorClashMode />} />
        <Route path="/rush/mirror-mode" element={<MirrorMode />} />
        <Route path="/rush/memory-mode" element={<MemoryMode />} />
        <Route path="/rush/echo-mode" element={<EchoMode />} />
      </Routes>
    </div>
  );
};

export default App;
