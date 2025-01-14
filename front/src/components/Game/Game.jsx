import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import GameOver from "../GameOver/GameOver";
import Settings from "../Settings/Settings";
import PlayerHand from "../PlayerHand/PlayerHand";
import Info from "../Info/Info"; // Import du composant Info
import { fetchInitialGameState } from "../../utils/api";
import { checkForFlip, updateScores, getWinner } from "../../utils/utils"; // Import des utilitaires
import "./Game.css";
import cursorImage from "../../assets/cursor.png";

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
  const [showPlayer1Cards, setShowPlayer1Cards] = useState(true);
  const [showPlayer2Cards, setShowPlayer2Cards] = useState(true);

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
    const cardToPlace = draggedCard || selectedCard;
    if (cardToPlace && !board[index]) {
      const newBoard = board.slice();
      newBoard[index] = { ...cardToPlace, position: index };
      setBoard(newBoard);

      if (cardToPlace.owner === "red") {
        setPlayer1Hand(player1Hand.filter((c) => c.id !== cardToPlace.id));
      } else {
        setPlayer2Hand(player2Hand.filter((c) => c.id !== cardToPlace.id));
      }

      const flippedCards = checkForFlip(
        newBoard,
        index,
        cardToPlace,
        (oldOwner, newOwner) =>
          updateScores(oldOwner, newOwner, setPlayer1Score, setPlayer2Score)
      );
      setFlippedCards(flippedCards);

      setSelectedCard(null);
      setCurrentPlayer(currentPlayer === "red" ? "blue" : "red");

      if (newBoard.every((cell) => cell !== null)) {
        setGameOver(true);
        setWinnerMessage(getWinner(newBoard));
      }
    }
  };

  return (
    <div className="game-container">
      <Settings
        showPlayer1Cards={showPlayer1Cards}
        setShowPlayer1Cards={setShowPlayer1Cards}
        showPlayer2Cards={showPlayer2Cards}
        setShowPlayer2Cards={setShowPlayer2Cards}
      />
      <div className="game">
        <PlayerHand
          currentPlayer={currentPlayer}
          cursorImage={cursorImage}
          hand={player1Hand}
          onCardSelect={handleCardSelect}
          selectedCard={selectedCard}
          playerPosition="left"
          showCards={showPlayer1Cards}
          score={player1Score}
        />
        <Board board={board} onCardPlace={handleCardPlace} />
        <PlayerHand
          currentPlayer={currentPlayer}
          cursorImage={cursorImage}
          hand={player2Hand}
          onCardSelect={handleCardSelect}
          selectedCard={selectedCard}
          playerPosition="right"
          showCards={showPlayer2Cards}
          score={player2Score}
        />
      </div>
      {selectedCard && <Info selectedCard={selectedCard} />}{" "}
      {/* Condition d'affichage */}
      {gameOver && (
        <GameOver winnerMessage={winnerMessage} onReset={initializeGame} />
      )}
    </div>
  );
};

export default Game;
