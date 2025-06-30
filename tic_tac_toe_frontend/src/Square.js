import React from "react";

// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square${highlight ? " highlight" : ""}`}
      onClick={onClick}
      disabled={!!value}
      aria-label={value ? `Cell with ${value}` : "Empty cell"}
    >
      {value}
    </button>
  );
}

export default Square;
