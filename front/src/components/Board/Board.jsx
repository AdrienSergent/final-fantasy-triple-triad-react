import React, { useState, useEffect } from "react";
import "./Board.css";
import Card from "../Cards/Card";

const Board = ({ board, onCardPlace }) => {
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    if (flippedCards.length > 0) {
      const timer = setTimeout(() => {
        setFlippedCards([]);
      }, 600); // Duration of the flip animation
      return () => clearTimeout(timer);
    }
  }, [flippedCards]);

  const handleCardPlace = (index) => {
    onCardPlace(index, setFlippedCards);
  };

  return (
    <div className="board">
      {board.map((cell, index) => (
        <div
          key={index}
          className={`cell ${cell ? cell.owner : ""} ${
            flippedCards.includes(index) ? "card-flip" : ""
          }`}
          onClick={() => handleCardPlace(index)}
        >
          {cell && <Card card={cell} />}
        </div>
      ))}
    </div>
  );
};

export default Board;
