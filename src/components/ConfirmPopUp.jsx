import React from "react";

const ConfirmPopUp = ({ handleExit, setShowConfirm }) => {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
      <div className="p-6 rounded-2xl text-white w-[400px] max-w-[90%] flex flex-col gap-6 items-center bg-black/40 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_25px_rgba(0,255,255,0.2)] animate-fadeIn">
        <p className="text-lg text-center text-cyan-200 font-light tracking-wide">
          Are you sure? Your progress will be lost!
        </p>

        <div className="flex justify-between gap-5 w-full mt-3">
          <button
            onClick={handleExit}
            className="flex-1 px-4 py-2 rounded-md text-sm font-semibold cursor-pointer tracking-wide transition-all bg-red-600 hover:bg-red-500 text-white shadow-[0_0_10px_rgba(255,0,0,0.4)]"
          >
            Yes
          </button>

          <button
            onClick={() => setShowConfirm(false)}
            className="flex-1 px-4 py-2 rounded-md text-sm font-semibold cursor-pointer tracking-wide transition-all bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_10px_rgba(0,255,255,0.3)]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopUp;
