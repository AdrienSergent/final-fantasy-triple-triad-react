import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import Hand from "../Hand/Hand";
import { fetchInitialGameState } from "../../utils/api";
import "./Game.css";
import cursorImage from "../../assets/down-arrow.png"; // Import the cursor image

const Game = () => {
  const [board, setBoard] = useState([]);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [selectedCard, setSelectedCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialState = fetchInitialGameState();
    setBoard(initialState.board);
    setPlayer1Hand(initialState.player1Hand);
    setPlayer2Hand(initialState.player2Hand);
    setCurrentPlayer(Math.random() > 0.5 ? "red" : "blue");
    setSelectedCard(null);
    setGameOver(false);
    setWinnerMessage("");
  };

  const handleCardSelect = (card) => {
    if (card.owner === currentPlayer) {
      setSelectedCard(card);
    }
  };

  const handleCardPlace = (index) => {
    if (selectedCard && !board[index]) {
      const newBoard = board.slice();
      newBoard[index] = { ...selectedCard, position: index };
      setBoard(newBoard);
      if (currentPlayer === "red") {
        setPlayer1Hand(player1Hand.filter((c) => c.id !== selectedCard.id));
      } else {
        setPlayer2Hand(player2Hand.filter((c) => c.id !== selectedCard.id));
      }
      checkForFlip(newBoard, index, selectedCard);
      setSelectedCard(null);
      setCurrentPlayer(currentPlayer === "red" ? "blue" : "red");
      if (newBoard.every((cell) => cell !== null)) {
        setGameOver(true);
        setWinnerMessage(getWinner(newBoard));
      }
    }
  };

  const checkForFlip = (board, index, card) => {
    const adjacentIndices = [
      index - 3, // above
      index + 3, // below
      index % 3 !== 0 ? index - 1 : null, // left
      index % 3 !== 2 ? index + 1 : null, // right
    ];

    adjacentIndices.forEach((adjIndex, i) => {
      if (
        adjIndex !== null &&
        board[adjIndex] &&
        board[adjIndex].owner !== card.owner
      ) {
        const adjacentCard = board[adjIndex];
        let shouldFlip = false;
        switch (i) {
          case 0: // above
            shouldFlip = card.top > adjacentCard.bottom;
            break;
          case 1: // below
            shouldFlip = card.bottom > adjacentCard.top;
            break;
          case 2: // left
            shouldFlip = card.left > adjacentCard.right;
            break;
          case 3: // right
            shouldFlip = card.right > adjacentCard.left;
            break;
          default:
            break;
        }
        if (shouldFlip) {
          board[adjIndex].owner = card.owner;
        }
      }
    });
    setBoard(board);
  };

  const getWinner = (finalBoard) => {
    const redCount = finalBoard.filter(
      (cell) => cell && cell.owner === "red"
    ).length;
    const blueCount = finalBoard.filter(
      (cell) => cell && cell.owner === "blue"
    ).length;
    if (redCount > blueCount) return "Red wins!";
    if (blueCount > redCount) return "Blue wins!";
    return "Draw!";
  };

  return (
    <div className="game-container">
      <div className="game">
        <div className="player-hand-container">
          {currentPlayer === "red" && (
            <img src={cursorImage} alt="cursor" className="cursor" />
          )}
          <Hand
            hand={player1Hand}
            onCardSelect={handleCardSelect}
            selectedCard={selectedCard}
            currentPlayer={currentPlayer}
          />
        </div>
        <Board board={board} onCardPlace={handleCardPlace} />
        <div className="player-hand-container">
          {currentPlayer === "blue" && (
            <img src={cursorImage} alt="cursor" className="cursor" />
          )}
          <Hand
            hand={player2Hand}
            onCardSelect={handleCardSelect}
            selectedCard={selectedCard}
            currentPlayer={currentPlayer}
          />
        </div>
      </div>
      {gameOver && (
        <div className="end-game">
          <div className="winner">{winnerMessage}</div>
          <button onClick={initializeGame} className="reset-button">
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
