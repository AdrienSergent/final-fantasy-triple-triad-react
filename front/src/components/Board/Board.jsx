import React from "react";
import "./Board.css";
import Card from "../Cards/Card";

const Board = ({ board, onCardPlace }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <div
          key={index}
          className={`cell ${cell ? cell.owner : ""}`}
          onClick={() => onCardPlace(index)}
        >
          {cell && <Card card={cell} />}
        </div>
      ))}
    </div>
  );
};

export default Board;
