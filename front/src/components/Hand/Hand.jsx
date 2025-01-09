import React, { useState } from "react";
import Card from "../Cards/Card";
import "./Hand.css";

const Hand = ({
  hand,
  onCardSelect,
  selectedCard,
  currentPlayer,
  playerPosition,
  showCards,
}) => {
  const [draggedCard, setDraggedCard] = useState(null); // Carte en cours de drag

  const handleDragStart = (event, card) => {
    if (card.owner === currentPlayer) {
      setDraggedCard(card); // Garde une référence de la carte déplacée
      event.dataTransfer.setData("card", JSON.stringify(card)); // Passe les données via drag-and-drop
    }
  };

  const handleDragEnd = () => {
    setDraggedCard(null); // Réinitialise après le drag
  };

  return (
    <div className="hand">
      {hand.map((card, index) => (
        <div
          key={index}
          onClick={() => onCardSelect(card)} // Sélection par clic
          draggable={card.owner === currentPlayer} // Active le drag uniquement pour le joueur actif
          onDragStart={(event) => handleDragStart(event, card)} // Début du drag
          onDragEnd={handleDragEnd} // Fin du drag
          className={`hand-card ${
            card === selectedCard
              ? playerPosition === "left"
                ? "selected-left"
                : "selected-right"
              : ""
          } ${card.owner === currentPlayer ? "current-player" : ""}`}
        >
          {showCards || card.owner === currentPlayer ? (
            <Card card={card} />
          ) : (
            <div className="card-back">?</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Hand;
