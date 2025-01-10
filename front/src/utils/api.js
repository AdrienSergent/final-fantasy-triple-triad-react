import { cardsData } from "./cardsData";

export const fetchInitialGameState = () => {
  // Mélanger les cartes
  const shuffledCards = [...cardsData].sort(() => Math.random() - 0.5);

  // Assigner 5 cartes aléatoires à chaque joueur
  const player1Hand = shuffledCards.slice(0, 5).map((card, index) => ({
    id: index + 1,
    top: card.top,
    left: card.left,
    right: card.right,
    bottom: card.bottom,
    image: card.redImage,
    redImage: card.redImage,
    blueImage: card.blueImage, // Image rouge pour le joueur 1
    owner: "red",
  }));

  const player2Hand = shuffledCards.slice(5, 10).map((card, index) => ({
    id: index + 6,
    top: card.top,
    left: card.left,
    right: card.right,
    bottom: card.bottom,
    image: card.blueImage,
    redImage: card.redImage,
    blueImage: card.blueImage, // Image bleue pour le joueur 2
    owner: "blue",
  }));

  return {
    board: Array(9).fill(null),
    player1Hand,
    player2Hand,
  };
};
