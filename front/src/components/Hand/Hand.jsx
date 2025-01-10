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
  const [floatingStyle, setFloatingStyle] = useState({}); // Style pour la carte flottante

  const handleDragStart = (event, card) => {
    if (card.owner === currentPlayer) {
      setDraggedCard(card); // Garde une référence de la carte déplacée
      event.dataTransfer.setData("card", JSON.stringify(card)); // Passe les données via drag-and-drop
      setFloatingStyle({
        left: `${event.clientX - 50}px`,
        top: `${event.clientY - 50}px`,
      });
    }
  };

  const handleDrag = (event) => {
    if (draggedCard) {
      setFloatingStyle({
        left: `${event.clientX - 50}px`,
        top: `${event.clientY - 50}px`,
      });
    }
  };

  const handleDragEnd = () => {
    setDraggedCard(null); // Réinitialise après le drag
    setFloatingStyle({});
  };

  return (
    <div className="hand" onDragOver={handleDrag}>
      {hand.map((card, index) => (
        <div
          key={index}
          onClick={() => onCardSelect(card)} // Sélection par clic
          draggable={card.owner === currentPlayer} // Active le drag uniquement pour le joueur actif
          onDragStart={(event) => handleDragStart(event, card)} // Début du drag
          onDragEnd={handleDragEnd} // Fin du drag
          className={`hand-card ${
            selectedCard && selectedCard.id === card.id
              ? playerPosition === "left"
                ? "selected-left"
                : "selected-right"
              : ""
          } ${
            card.owner === currentPlayer && card === draggedCard
              ? "hidden" // Masque la carte pendant le drag
              : ""
          }`}
        >
          {showCards || card.owner === currentPlayer ? (
            <img src={card.image} alt={card.name} className="card-image" />
          ) : (
            <div className="card-back">?</div>
          )}
        </div>
      ))}

      {draggedCard && (
        <div className="floating-card" style={floatingStyle}>
          <img
            src={draggedCard.image}
            alt={draggedCard.name}
            className="card-image"
          />
        </div>
      )}
    </div>
  );
};

export default Hand;
