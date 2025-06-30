import React from "react";
import Square from "./Square";

// PUBLIC_INTERFACE
function Board({ squares, onClick, winner }) {
  // Render a 3x3 grid of squares
  const renderSquare = (i) => (
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}
      highlight={!!winner && squares[i] === winner}
      key={i}
    />
  );

  return (
    <div className="board-grid">
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

export default Board;
