import '../styles/board.css';
import { useState, useEffect, useRef } from 'react';

const Square = ({ value, onSquareClick, disabled }) => {
  return (
    <button className="square" onClick={onSquareClick} disabled={disabled}>
      {value}
    </button>
  );
};

export default function SingleGameBoard() {
  const [playerX, setPlayerX] = useState(true); // Player getting X (1st turn)
  const [announcement, setAnnouncement] = useState(null); // Announcing turns
  const [squares, setSquares] = useState(Array(9).fill(null)); // Game board
  const [xisNext, setXisNext] = useState(true); // X or O turn state
  const computerMoving = useRef(false); // Track computer movement across renders

  // Handle game start (announcement & turn decision)
  useEffect(() => {
    const randomNum = Math.random();
    announce(randomNum);

    const timer = setTimeout(() => {
      decideTurn(randomNum);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!playerX) {
      computerMove(squares);
    }
  }, [playerX]);

  // Decide turn
  const decideTurn = (Num) => {
    setPlayerX(Num < 0.5);
  };

  // Show announcement
  const announce = (Num) => {
    setAnnouncement(Num < 0.5 ? "Your turn first." : "Computer's turn first.");
    setTimeout(() => {
      setAnnouncement(null);
    }, 3000);
  };

  // Computer move logic
  const computerMove = (board) => {
    if (calculateWinner(board) || board.every((square) => square !== null)) return;
    if (computerMoving.current) return; // Prevent multiple moves

    computerMoving.current = true;
    let availableMoves = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    setTimeout(() => {
      board[randomMove] = xisNext ? 'X' : 'O';
      setSquares([...board]);
      setXisNext(!xisNext);
      setPlayerX(true);
      computerMoving.current = false;
    }, 500);
  };

  // Handle user move
  const handleClick = (i) => {
    if (calculateWinner(squares) || !playerX || computerMoving.current || announcement || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xisNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXisNext(!xisNext);
    setPlayerX(false);
  };

  // Determine game status
  let winner = calculateWinner(squares);
  let isDraw = squares.every((square) => square !== null) && !winner;
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else if (announcement) {
    status = "Mystic Toe";
  } else {
    status = playerX ? "Your turn." : "Computer is moving...";
  }

  // Restart game
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXisNext(true);
    setPlayerX(true);
    computerMoving.current = false;

    const randomNum = Math.random();
    announce(randomNum);

    const timer = setTimeout(() => {
      decideTurn(randomNum);
    }, 3000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="board-container">
      {announcement && <p className="announcement">{announcement}</p>}
      <h1>{status}</h1>
      <div className="board">
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
      <button onClick={handleRestart} className="restart-button">Restart</button>
    </div>
  );
}

// Function to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}