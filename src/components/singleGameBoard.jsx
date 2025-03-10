import '../styles/board.css';
import { useState, useEffect } from 'react';

const Square = ({ value, onSquareClick, disabled }) => {
  return (
    <button className="square" onClick={onSquareClick} disabled={disabled}>
      {value}
    </button>
  );
};

export default function SingleGameBoard() {
  const [playerX, setPlayerX] = useState(true); //for player getting X(1st turn)
  const [Announcement,setAnnouncement] =useState(null); //for 3s announcing whose turn is it
  const [squares, setSquares] = useState(Array(9).fill(null)); //array
  const [xisNext, setXisNext ] = useState(true);//for x and o 
  

  //starting to decide turns and announcement
  useEffect(()=>{
    handleRestart();
  },[]);

  useEffect(()=> {
    if (!playerX) {
      computerMove(squares);
    }
  },[playerX])

  //turn decision
  const decideTurn = (Num) => {
    if (Num < 0.5) {
      setPlayerX(true);
    } else {
      setPlayerX(false);
    }
  }

  const announce = (Num) => {
    if (Num < 0.5) {
      setAnnouncement('Your turn first.');
    } else {
      setAnnouncement('Computer\'s turn first.');
    }
    setTimeout(()=>{
      setAnnouncement(null);
    },3000)
  }

  const computerMove = (board) => {
    if (calculateWinner(board) || board.every((square) => square !== null)) return;

    let availableMoves = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    setTimeout(()=>{
      board[randomMove] = xisNext ? 'X' : 'O';
      setSquares([...board]);
      setXisNext(!xisNext);
      setPlayerX(!playerX);
    },1000);
  };

  const handleClick = (i) => {
    if (calculateWinner(squares)|| !playerX || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xisNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXisNext(!xisNext);
    setPlayerX(!playerX);
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
    const randomNum = Math.random();

    announce(randomNum);

    const mytimer = setTimeout(() => {
      decideTurn(randomNum);
    }, 3000); //Since computer move is checking need to add time

    return ()=> clearTimeout(mytimer);
  }

  return(
    <>
    
    <div className='board-container'>
    { Announcement && <p className="announcement">{Announcement}</p>}
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