export const checkForFlip = (board, index, card, updateScores) => {
  const adjacentIndices = [
    index - 3, // above
    index + 3, // below
    index % 3 !== 0 ? index - 1 : null, // left
    index % 3 !== 2 ? index + 1 : null, // right
  ];

  const flippedCards = [];

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
        board[adjIndex] = {
          ...adjacentCard,
          owner: card.owner,
          image:
            card.owner === "red"
              ? adjacentCard.redImage
              : adjacentCard.blueImage,
        };
        flippedCards.push(adjIndex);
        updateScores(adjacentCard.owner, card.owner);
      }
    }
  });

  return flippedCards;
};

export const updateScores = (
  oldOwner,
  newOwner,
  setPlayer1Score,
  setPlayer2Score
) => {
  if (newOwner === "red") {
    setPlayer1Score((prevScore) => Math.max(0, prevScore + 1));
    setPlayer2Score((prevScore) => Math.max(0, prevScore - 1));
  } else {
    setPlayer1Score((prevScore) => Math.max(0, prevScore - 1));
    setPlayer2Score((prevScore) => Math.max(0, prevScore + 1));
  }
};

export const getWinner = (finalBoard) => {
  const redCount = finalBoard.filter(
    (cell) => cell && cell.owner === "red"
  ).length;
  const blueCount = finalBoard.filter(
    (cell) => cell && cell.owner === "blue"
  ).length;
  return redCount > blueCount
    ? "Red wins!"
    : blueCount > redCount
    ? "Blue wins!"
    : "Draw!";
};
