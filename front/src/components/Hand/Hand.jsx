import React from "react";
import Card from "../Cards/Card";
import "./Hand.css";

const Hand = ({ hand, onCardSelect }) => {
  return (
    <div className="hand">
      {hand.map((card, index) => (
        <div key={index} onClick={() => onCardSelect(card)}>
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};

export default Hand;
