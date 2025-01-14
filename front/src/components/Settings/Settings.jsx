import React from "react";

const Settings = ({
  showPlayer1Cards,
  setShowPlayer1Cards,
  showPlayer2Cards,
  setShowPlayer2Cards,
}) => {
  return (
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
  );
};

export default Settings;
