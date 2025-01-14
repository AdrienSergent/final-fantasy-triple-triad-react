import React from "react";
import Hand from "../Hand/Hand";

const PlayerHand = ({
  currentPlayer,
  cursorImage,
  hand,
  onCardSelect,
  selectedCard,
  playerPosition,
  showCards,
  score,
}) => {
  return (
    <div className="player-hand-container">
      {currentPlayer === (playerPosition === "left" ? "red" : "blue") && (
        <img src={cursorImage} alt="cursor" className="cursor" />
      )}
      <Hand
        hand={hand}
        onCardSelect={onCardSelect}
        selectedCard={selectedCard}
        currentPlayer={currentPlayer}
        playerPosition={playerPosition}
        showCards={showCards}
      />
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default PlayerHand;
