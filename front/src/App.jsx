import React from "react";
import Game from "../src/components/Game/Game";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Triple Triad</h1>
      </header>
      <Game />
    </div>
  );
};

export default App;
