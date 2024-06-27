export const fetchInitialGameState = () => {
  return {
    board: [
      { card: null },
      { card: null },
      { card: null },
      { card: null },
      { card: null },
      { card: null },
      { card: null },
      { card: null },
      { card: null },
    ],
    player1Hand: [
      { top: 5, left: 7, right: 3, bottom: 2 },
      { top: 6, left: 1, right: 4, bottom: 5 },
      { top: 2, left: 4, right: 6, bottom: 8 },
      { top: 1, left: 2, right: 3, bottom: 4 },
      { top: 4, left: 5, right: 6, bottom: 7 },
    ],
    player2Hand: [
      { top: 5, left: 7, right: 3, bottom: 2 },
      { top: 6, left: 1, right: 4, bottom: 5 },
      { top: 2, left: 4, right: 6, bottom: 8 },
      { top: 1, left: 2, right: 3, bottom: 4 },
      { top: 4, left: 5, right: 6, bottom: 7 },
    ],
  };
};
