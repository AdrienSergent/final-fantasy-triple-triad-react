import React from "react";
import "./Info.css";

const Info = ({ selectedCard }) => {
  console.log(selectedCard);
  return (
    <div className="info-panel">
      {/* <span className="info-label">INFO.</span> */}
      <span className="info-name">
        {selectedCard ? selectedCard.name : "None"}
      </span>
    </div>
  );
};

export default Info;
