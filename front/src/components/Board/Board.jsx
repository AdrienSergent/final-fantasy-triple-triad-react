import React, { useState, useEffect } from "react";
import "./Board.css";
import Card from "../Cards/Card";

const Board = ({ board, onCardPlace }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [dragOverCell, setDragOverCell] = useState(null); // Pour surligner une cellule lors du drag

  useEffect(() => {
    if (flippedCards.length > 0) {
      const timer = setTimeout(() => {
        setFlippedCards([]);
      }, 600); // Durée de l'animation de flip
      return () => clearTimeout(timer);
    }
  }, [flippedCards]);

  const handleDragOver = (event, index) => {
    event.preventDefault(); // Permet de déposer la carte
    setDragOverCell(index); // Marque la cellule survolée
  };

  const handleDragLeave = () => {
    setDragOverCell(null); // Supprime le surlignage
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    setDragOverCell(null); // Réinitialise le surlignage
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
          } ${dragOverCell === index ? "drag-over" : ""}`}
          onClick={() => handleCardPlace(index)} // Placement via clic
          onDragOver={(event) => handleDragOver(event, index)} // Permet le survol
          onDragLeave={handleDragLeave} // Supprime le surlignage au sortir
          onDrop={(event) => handleDrop(event, index)} // Gestion du drop
        >
          {cell && <Card card={cell} />} {/* Affiche la carte si elle existe */}
        </div>
      ))}
    </div>
  );
};

export default Board;
