import React from "react";
import { motion } from "framer-motion";
import Images from "../constants/images";
import { useNavigate } from "react-router";

const rushModes = [
  {
    id: "reaction",
    title: "Reaction Mode",
    desc: "Test your reflexes with fast prompts!",
  },
  {
    id: "blind",
    title: "Blind Mode",
    desc: "Type without seeing what you write!",
  },
  {
    id: "accuracy",
    title: "Accuracy Mode",
    desc: "Focus purely on correctness!",
  },
  {
    id: "marathon",
    title: "Marathon Mode",
    desc: "Endure long passages for ultimate stamina!",
  },
];

const RushModePopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSelect = (mode) => {
    navigate(`/rush/${mode}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${Images.HomeImg})` }}
      />
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Popup Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative z-10 bg-black/40 backdrop-blur-lg border border-cyan-500/30 
                   shadow-[0_0_20px_rgba(0,255,255,0.25)] rounded-2xl p-6 w-[420px] 
                   max-w-[90%] flex flex-col gap-4 text-white"
      >
        <h2 className="text-center text-2xl font-semibold text-cyan-400 tracking-wide mb-2">
          Rush Mode
        </h2>

        <div className="flex flex-col gap-3">
          {rushModes.map((mode) => (
            <motion.div
              key={mode.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(mode.id)}
              className="cursor-pointer border border-cyan-500/30 bg-black/30 
                         hover:bg-cyan-500/10 rounded-lg p-3 transition-all"
            >
              <h3 className="text-lg font-semibold text-cyan-300">
                {mode.title}
              </h3>
              <p className="text-sm text-gray-300">{mode.desc}</p>
            </motion.div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-gray-700 hover:bg-gray-600 py-2 rounded-md font-semibold text-sm 
                     shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all"
        >
          Back
        </button>
      </motion.div>
    </div>
  );
};

export default RushModePopup;
