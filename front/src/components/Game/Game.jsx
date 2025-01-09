import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import Hand from "../Hand/Hand";
import { fetchInitialGameState } from "../../utils/api";
import "./Game.css";
import cursorImage from "../../assets/cursor.png"; // Import the cursor image

const Game = () => {
  const [board, setBoard] = useState([]);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [selectedCard, setSelectedCard] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [player1Score, setPlayer1Score] = useState(5);
  const [player2Score, setPlayer2Score] = useState(5);
  const [showPlayer1Cards, setShowPlayer1Cards] = useState(true); // Visibilité des cartes du joueur 1
  const [showPlayer2Cards, setShowPlayer2Cards] = useState(true); // Visibilité des cartes du joueur 2

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
    setPlayer1Score(5);
    setPlayer2Score(5);
  };

  const handleCardSelect = (card) => {
    if (card.owner === currentPlayer) {
      setSelectedCard(card);
    }
  };

  const handleCardPlace = (index, setFlippedCards, draggedCard = null) => {
    const cardToPlace = draggedCard || selectedCard; // Priorité au drag-and-drop
    if (cardToPlace && !board[index]) {
      const newBoard = board.slice();
      newBoard[index] = { ...cardToPlace, position: index };
      setBoard(newBoard);

      if (cardToPlace.owner === "red") {
        setPlayer1Hand(player1Hand.filter((c) => c.id !== cardToPlace.id));
      } else {
        setPlayer2Hand(player2Hand.filter((c) => c.id !== cardToPlace.id));
      }

      checkForFlip(newBoard, index, cardToPlace, setFlippedCards);
      setSelectedCard(null);
      setCurrentPlayer(currentPlayer === "red" ? "blue" : "red");

      if (newBoard.every((cell) => cell !== null)) {
        setGameOver(true);
        setWinnerMessage(getWinner(newBoard));
      }
    }
  };

  const checkForFlip = (board, index, card, setFlippedCards) => {
    const adjacentIndices = [
      index - 3, // above
      index + 3, // below
      index % 3 !== 0 ? index - 1 : null, // left
      index % 3 !== 2 ? index + 1 : null, // right
    ];

    const newFlippedCards = [];

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
          newFlippedCards.push(adjIndex);
          updateScores(adjacentCard.owner, card.owner);
        }
      }
    });

    setFlippedCards(newFlippedCards);
    setBoard(board);
  };

  const updateScores = (oldOwner, newOwner) => {
    if (newOwner === "red") {
      setPlayer1Score((prevScore) => Math.max(0, prevScore + 1));
      setPlayer2Score((prevScore) => Math.max(0, prevScore - 1));
    } else {
      setPlayer1Score((prevScore) => Math.max(0, prevScore - 1));
      setPlayer2Score((prevScore) => Math.max(0, prevScore + 1));
    }
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
      <div className="settings">
        <label>
          <input
            type="checkbox"
            checked={showPlayer1Cards}
            onChange={() => setShowPlayer1Cards((prev) => !prev)}
          />
          Show Player 1 Cards
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPlayer2Cards}
            onChange={() => setShowPlayer2Cards((prev) => !prev)}
          />
          Show Player 2 Cards
        </label>
      </div>
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
            playerPosition="left"
            showCards={showPlayer1Cards}
          />
          <div className="score">Score: {player1Score}</div>
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
            playerPosition="right"
            showCards={showPlayer2Cards}
          />
          <div className="score">Score: {player2Score}</div>
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
