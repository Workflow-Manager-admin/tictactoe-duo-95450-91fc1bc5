import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./Board";

// Color tokens from task details, used in CSS variables:
// --primary: #2196f3 (blue)
// --secondary: #f44336 (red)
// --accent: #ffeb3b (yellow)

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light"); // Keep theme toggle for completeness
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isGameActive, setIsGameActive] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  function handleClick(index) {
    if (squares[index] || winner || !isGameActive) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext((prev) => !prev);
  }

  // Check for winner or draw
  useEffect(() => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of winLines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
        setIsGameActive(false);
        return;
      }
    }
    if (squares.every(Boolean) && !winner) {
      setWinner("draw");
      setIsGameActive(false);
    }
  // eslint-disable-next-line
  }, [squares]);

  // PUBLIC_INTERFACE
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setIsGameActive(true);
    setWinner(null);
  }

  let status;
  if (winner === "draw") {
    status = "It's a draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next turn: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="App main-background">
      <header className="game-container">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <div className="status-container">
          <h1 className="title">Tic Tac Toe</h1>
          <div className={`game-status ${winner ? "game-over" : ""}`}>
            {status}
          </div>
        </div>
        <Board squares={squares} onClick={handleClick} winner={winner} />
        <div className="controls">
          <button className="btn btn-large primary-btn" onClick={handleReset}>
            {winner ? "New Game" : "Reset"}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
