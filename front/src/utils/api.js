export const fetchInitialGameState = () => {
  return {
    board: Array(9).fill(null),
    player1Hand: [
      { id: 1, top: 5, left: 7, right: 3, bottom: 2, owner: "red" },
      { id: 2, top: 6, left: 1, right: 4, bottom: 5, owner: "red" },
      { id: 3, top: 2, left: 4, right: 6, bottom: 8, owner: "red" },
      { id: 4, top: 1, left: 2, right: 3, bottom: 4, owner: "red" },
      { id: 5, top: 4, left: 5, right: 6, bottom: 7, owner: "red" },
    ],
    player2Hand: [
      { id: 6, top: 5, left: 7, right: 3, bottom: 2, owner: "blue" },
      { id: 7, top: 6, left: 1, right: 4, bottom: 5, owner: "blue" },
      { id: 8, top: 2, left: 4, right: 6, bottom: 8, owner: "blue" },
      { id: 9, top: 1, left: 2, right: 3, bottom: 4, owner: "blue" },
      { id: 10, top: 9, left: 9, right: 9, bottom: 9, owner: "blue" },
    ],
  };
};
