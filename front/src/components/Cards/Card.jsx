import React from "react";
import "./Card.css";

const Card = ({ card, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      {card.image && (
        <img src={card.image} alt={card.name} className="card-image" />
      )}
    </div>
  );
};

export default Card;
