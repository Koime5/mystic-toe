import '../styles/board.css';
import { useState, useEffect, React } from 'react';

const Square = ({ value, onSquareClick, isDisabled, isWinning }) => {
  return (
    <button className={`square ${isWinning ? 'winning-square' : ''}`}  onClick={onSquareClick} disabled={isDisabled}>
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
  const [winningLine, setWinningLine] = useState([]);
  
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

    return () => clearTimeout(mytime);
  }

  
  useEffect (()=>{
    let timeoutId;
    if (computerTurn) {
      timeoutId = computerMove();
    }
    return ()=> clearTimeout(timeoutId);
  },[computerTurn]);

  const computerMove = () => {
    if (calculateWinner(squares) || computerIsMoving || squares.every((square) => square !== null)) return;

    setComputerIsMoving(true);

    let availableMoves = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return setTimeout(()=>{
      setSquares(prev => {
        const next = [...prev];
        next[randomMove] = xisNext ? 'X' : 'O';
        return next;
      });
      setComputerTurn(false);
      setXisNext(prev => !prev);
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
    setWinningLine([]);
    setXisNext(true);
    setComputerTurn(false)
    setPlayerTurn(false);
    randomize();
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;

  useEffect(() => {
    if (winnerInfo) {
      setWinningLine(winnerInfo.line || []);
    } else {
      setWinningLine([]);
    }
  }, [winnerInfo]);

  let isdraw = squares.every(square => square !== null ) && !winner;
  
  let status;
  if (winner) {
    if ((playerisX && winner === 'X') || (!playerisX && winner === 'O')) {
      status = 'You win!';
    } else {
      status = 'Computer wins!';
    }
  } else if (isdraw) {
    status = 'Draw';
  } else if (announcement) {
    status = 'Mystic Toe';
  } else {
    status = playerTurn ? 'Your turn' : "Computer's turn";
  }

  const renderBoard = () => {
    return [0, 1, 2].map(row => (
      <div className="board-row" key={row}>
        {[0, 1, 2].map(col => {
          const index = row * 3 + col;
          return (
            <Square
              key={index}
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              isDisabled={!playerTurn || computerIsMoving}
              isWinning={winningLine.includes(index)}
            />
          );
        })}
      </div>
    ));
  };

  return(
    <>
    
    <div className='board-container'>
    { announcement && <p className="announcement">{announcement}</p>}
    <h1>{status}</h1>
    <div className='board'>
      {renderBoard()}
    </div>
    { !announcement && <button onClick={handleRestart}>Restart</button>}
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
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}