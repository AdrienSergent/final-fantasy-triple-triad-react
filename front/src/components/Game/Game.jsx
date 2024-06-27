import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import Hand from "../Hand/Hand";
import { fetchInitialGameState } from "../../utils/api";
import "./Game.css";

const Game = () => {
  const [board, setBoard] = useState([]);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const initialState = fetchInitialGameState();
    setBoard(initialState.board);
    setPlayer1Hand(initialState.player1Hand);
    setPlayer2Hand(initialState.player2Hand);
  }, []);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleCardPlace = (index) => {
    if (selectedCard) {
      const newBoard = board.slice();
      newBoard[index] = { card: selectedCard };
      setBoard(newBoard);

      if (player1Hand.includes(selectedCard)) {
        const newHand = player1Hand.filter((c) => c !== selectedCard);
        setPlayer1Hand(newHand);
      } else {
        const newHand = player2Hand.filter((c) => c !== selectedCard);
        setPlayer2Hand(newHand);
      }

      setSelectedCard(null);
    }
  };

  return (
    <div className="game">
      <div className="player-hand">
        <Hand hand={player1Hand} onCardSelect={handleCardSelect} />
      </div>
      <Board board={board} onCardPlace={handleCardPlace} />
      <div className="player-hand">
        <Hand hand={player2Hand} onCardSelect={handleCardSelect} />
      </div>
    </div>
  );
};

export default Game;
