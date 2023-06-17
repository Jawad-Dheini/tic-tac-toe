import "./App.css";
import { useState } from "react";

let sq1, sq2, sq3;

// let listItems = theList.getElementsByTagName("li");

const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
];

function Square({ value, onSquareClick, name }) {
  return (
    <button className={name} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner === "Draw") {
    status = "Draw";
  } else if (winner !== "Draw" && winner) {
    status = "Winner: " + winner;
    document.querySelector(`.${numbers[sq2]}`).style.color = "green";
    document.querySelector(`.${numbers[sq3]}`).style.color = "green";
    document.querySelector(`.${numbers[sq1]}`).style.color = "green";
    // } else if (listItems.length >= 10) {
    //   status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          name="zero"
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          name="one"
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          name="two"
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
      </div>
      <div className="board-row">
        <Square
          name="three"
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          name="four"
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          name="five"
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
      </div>
      <div className="board-row">
        <Square
          name="six"
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          name="seven"
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          name="eight"
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    const squareA = document?.querySelector(`.${numbers[sq2]}`);
    const squareB = document?.querySelector(`.${numbers[sq3]}`);
    const squareC = document?.querySelector(`.${numbers[sq1]}`);
    squareA.style.color = "black";
    squareB.style.color = "black";
    squareC.style.color = "black";
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul className="the-list">{moves}</ul>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      let winner = squares[a];
      sq1 = a;
      sq2 = b;
      sq3 = c;
      return winner;
    }
  }

  let arr = [];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) {
      arr.push(squares[i]);
    }
  }
  if (arr.length === squares.length) {
    return "Draw";
  }
  return null;
}
// 119 lines
