import React from "react";
// import "./GameOver.css";

const GameOver = ({ winnerMessage, onReset }) => {
  return (
    <div className="end-game">
      <div className="winner">{winnerMessage}</div>
      <button onClick={onReset} className="reset-button">
        Reset
      </button>
    </div>
  );
};

export default GameOver;
