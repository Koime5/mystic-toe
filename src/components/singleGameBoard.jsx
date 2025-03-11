import '../styles/board.css';
import { useState, useEffect } from 'react';

const Square = ({ value, onSquareClick,isDisabled }) => {
  return (
    <button className="square" onClick={onSquareClick} disabled={isDisabled}>
      {value}
    </button>
  );
};

export default function SingleGameBoard() {
  const [playerisX, setPlayerisX] = useState(null); //for player getting X(1st turn)
  const [announcement,setAnnouncement] =useState(null); //for 3s announcing whose turn is it
  const [squares, setSquares] = useState(Array(9).fill(null)); //array
  const [xisNext, setXisNext ] = useState(true);//for x and o 
  const [playerTurn,setPlayerTurn] = useState(false);
  const [computerTurn,setComputerTurn] = useState(false);
  const [computerIsMoving,setComputerIsMoving] = useState(false);
  

  //starting to decide turns and announcement
  useEffect(()=>{
    return randomize();
  },[]);
  
  const randomize = () => {
    const isPlayerX = Math.random() < 0.5;
    setPlayerisX(isPlayerX);
    setAnnouncement(isPlayerX ? 'Your turn first.' : 'Computer\'s turn first.');

    const mytime = setTimeout(()=>{
      if (isPlayerX) {
        setPlayerTurn(true);
        setComputerTurn(false);
      } else {
        setPlayerTurn(false);
        setComputerTurn(true);
      }
      setAnnouncement(null);
    },3000)

    return () => mytime;
  }

  
  useEffect (()=>{
    if (computerTurn) {
      computerMove();
    }
  },[computerTurn]);

  const computerMove = () => {
    if (calculateWinner(squares) || computerIsMoving || squares.every((square) => square !== null)) return;

    setComputerIsMoving(true);

    let availableMoves = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    setTimeout(()=>{
      const nextSquares = squares.slice();
      nextSquares[randomMove] = xisNext ? 'X' : 'O';
      setSquares(nextSquares);
      setComputerTurn(false);
      setXisNext(!xisNext);
      setPlayerTurn(true);
      setComputerIsMoving(false);
    },500);
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || !playerTurn || computerIsMoving || announcement || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xisNext ? 'X' : 'O';
    setSquares(nextSquares);
    setPlayerTurn(false);
    setXisNext(!xisNext);
    setComputerTurn(true);
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXisNext(true);
    setComputerTurn(false)
    setPlayerTurn(false);
    randomize();
  }

  let winner = calculateWinner(squares);
  let isdraw = squares.every(square => square !== null ) && !winner;
  let status;
  if (winner) {
    if (playerisX && winner==='X') {
      status = 'You win.';
    } else if (!playerisX && winner==='O') {
      status = 'You win.';
    } else {
      status = 'Computer wins.';
    }
  } else if (isdraw) {
    status = 'Draw';
  } else if (announcement) {
    status = 'Mystic Toe'
  } else {
    if (playerTurn) {
      status = 'Your turn.'
    } else if (computerTurn) {
      status = 'Computer\'s turn.'
    }
  }

  return(
    <>
    
    <div className='board-container'>
    { announcement && <p className="announcement">{announcement}</p>}
    <h1>{status}</h1>
    <div className='board'>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isDisabled={!playerTurn || computerIsMoving}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isDisabled={!playerTurn || computerIsMoving}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isDisabled={!playerTurn || computerIsMoving}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isDisabled={!playerTurn || computerIsMoving}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isDisabled={!playerTurn || computerIsMoving}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isDisabled={!playerTurn || computerIsMoving}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isDisabled={!playerTurn || computerIsMoving}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isDisabled={!playerTurn || computerIsMoving}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isDisabled={!playerTurn || computerIsMoving}/>
      </div>
    </div>
    <button onClick={handleRestart}>Restart</button>
    </div>
    </>
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