import React from "react";
import Card from "../Cards/Card";
import "./Hand.css";

const Hand = ({ hand, onCardSelect, selectedCard, currentPlayer }) => {
  return (
    <div className="hand">
      {hand.map((card, index) => (
        <div
          key={index}
          onClick={() => onCardSelect(card)}
          className={`hand-card ${card === selectedCard ? "selected" : ""} ${
            card.owner === currentPlayer ? "current-player" : ""
          }`}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};

export default Hand;
