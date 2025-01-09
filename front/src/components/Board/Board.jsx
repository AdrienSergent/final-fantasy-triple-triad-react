import React, { useState, useEffect } from "react";
import "./Board.css";
import Card from "../Cards/Card";

const Board = ({ board, onCardPlace }) => {
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    if (flippedCards.length > 0) {
      const timer = setTimeout(() => {
        setFlippedCards([]);
      }, 600); // Durée de l'animation de flip
      return () => clearTimeout(timer);
    }
  }, [flippedCards]);

  const handleDragOver = (event) => {
    event.preventDefault(); // Permet de déposer la carte
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const card = JSON.parse(event.dataTransfer.getData("card")); // Récupère les données de la carte
    onCardPlace(index, setFlippedCards, card); // Place la carte sur le plateau
  };

  const handleCardPlace = (index) => {
    onCardPlace(index, setFlippedCards); // Placement via clic
  };

  return (
    <div className="board">
      {board.map((cell, index) => (
        <div
          key={index}
          className={`cell ${cell ? cell.owner : ""} ${
            flippedCards.includes(index) ? "card-flip" : ""
          }`}
          onClick={() => handleCardPlace(index)} // Placement via clic
          onDragOver={handleDragOver} // Permet le survol
          onDrop={(event) => handleDrop(event, index)} // Gestion du drop
        >
          {cell && <Card card={cell} />}
        </div>
      ))}
    </div>
  );
};

export default Board;
