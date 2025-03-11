import '../styles/board.css';
import { useState, useEffect, React, useMemo } from 'react';
import Square from './square';

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
  
    let bestMove;
    let moveCount = squares.filter(sq => sq !== null).length;
    let availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(idx => idx !== null);
  
    if (moveCount === 0) {
      bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else if (moveCount === 1 && squares[4] !== null) {
      const corners = [0, 2, 6, 8];
      let availableCorners = corners.filter(corner => squares[corner] === null);
      if (availableCorners.length > 0) {
        bestMove = availableCorners[Math.floor(Math.random() * availableCorners.length)];
      } else {
        bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      }
    } else {
      bestMove = getBestMove(squares, xisNext ? 'X' : 'O');
    }
  
    setTimeout(() => {
      setSquares(prev => {
        const next = [...prev];
        next[bestMove] = xisNext ? 'X' : 'O';
        return next;
      });
      setComputerTurn(false);
      setXisNext(prev => !prev);
      setPlayerTurn(true);
      setComputerIsMoving(false);
    }, 500);
  };
  
  function getBestMove(board, aiPlayer) {
    const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  
    let bestScore = -Infinity;
    let move = null;
  
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = aiPlayer;
        let score = minimax(board, 0, false, aiPlayer, humanPlayer);
        board[i] = null;
  
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
  
    return move;
  }
  
  function minimax(board, depth, isMaximizing, aiPlayer, humanPlayer) {
    const winnerInfo = calculateWinner(board);
    if (winnerInfo) {
      return winnerInfo.winner === aiPlayer ? 1 : -1;
    }
    if (board.every(square => square !== null)) {
      return 0; 
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = aiPlayer;
          let score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = humanPlayer;
          let score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

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
  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const winner = winnerInfo?.winner;
  const hasWinner = !!winner;

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
              hasWinner={hasWinner}
              isDraw={isdraw}
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
    { !announcement && <button className='restart-button' onClick={handleRestart}>Restart</button>}
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