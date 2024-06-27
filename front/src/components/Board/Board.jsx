import React from "react";
import "../Board/Board.css";
import Card from "../Cards/Card";

const Board = ({ board, onCardPlace }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <div key={index} className="cell" onClick={() => onCardPlace(index)}>
          {cell.card && <Card card={cell.card} />}
        </div>
      ))}
    </div>
  );
};

export default Board;
