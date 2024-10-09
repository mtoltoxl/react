import { useState } from 'react';
import './App.css';

// renders a Board component, where the tictactoe game logic happens
function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

//board component
function Board() {
  // xIsNext is a state variable that keeps track of which player's turn it is
  // xIsNext = true means it's X's turn, xIsNext = false means it's O's turn
  // setXIsNext is a function that updates the xIsNext state variable
  const [xIsNext, setXIsNext] = useState(true);
  // squares is a state variable that keeps track of the current state of the board
  // setSquares is a function that updates the squares state variable
  const [squares, setSquares] = useState(Array(9).fill(null));

  // handleClick is a function that gets called when a square is clicked
  // prevents a square from being clicked if it's already filled or if there's a winner
  // i is the index of the square that was clicked, returned from the Square component
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // creates a copy of the squares array
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    // updates the squares array and xIsNext state variables
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // checks if there's a winner. If there's a winner, it displays the winner. If there's no winner, it displays the next player's turn
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // renders the board. Each square is represented by the Square component, which takes in the value of the square (squares[i]) and a function to handle the click event
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Square is a stateless component that renders a button element and displays either 'X' or 'O' based on the value of the square
// onSquareClick is passed from the Board component, and it gets called when the button is clicked
function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

// the lines array represents all the possible winning combinations in the game
// for each combination, it checks if all the squares have the same value (either 'X' or 'O')
// return winner if there's a winner, else return null
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
      return squares[a];
    }
  }
  return null;
}

export default App;


//useState(): returns an array with two elements
//the first element is the current state value, and the second element is a function that allows you to update the state value.