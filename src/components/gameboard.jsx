import '../styles/board.css';
import { useEffect, useState } from 'react';

const Square = ({value, onSquareClick}) => {

  return(
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}


const GameBoard = ()=> {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xisNext, setXisNext ] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xisNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXisNext(!xisNext);
  }

  let winner = calculateWinner(squares);
  let isdraw = squares.every(square => square !== null ) && !winner;
  let status;
  if (winner) {
    status = "winner :" + winner;
  } else if (isdraw) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xisNext ? 'X' : 'O');
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXisNext(true);
  }

  return(
    <div className='board-container'>
    <h1>{status}</h1>
    <div className='board'>
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
    </div>
    <button onClick={handleRestart}>Restart</button>
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default GameBoard;