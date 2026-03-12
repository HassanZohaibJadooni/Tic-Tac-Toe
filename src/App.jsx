import React, { useEffect, useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (board) => {
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  // Side effects here
  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        alert(`Player ${winner} Wins!`);
        setBoard(Array(9).fill(null));
        setIsXNext(true);
      }, 200);
    } else if (isDraw) {
      setTimeout(() => {
        alert("It's a Draw!");
        setBoard(Array(9).fill(null));
        setIsXNext(true);
      }, 200);
    }
  }, [winner, isDraw]);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="container">
      <h2>Tic Tac Toe</h2>

      <div className="board">
        {board.map((cell, index) => (
          <button key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>

      <p>{!winner && !isDraw ? `Next Player: ${isXNext ? "X" : "O"}` : ""}</p>

      <button className="reset-btn" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
