import '../styles/board.css';
import { useState, useEffect } from 'react';

const Square = ({ value, onSquareClick, disabled }) => {
  return (
    <button className="square" onClick={onSquareClick} disabled={disabled}>
      {value}
    </button>
  );
};

const SingleGameBoard = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [userIsX, setUserIsX] = useState(null);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    assignRandomRoles();
  }, []);

  const assignRandomRoles = () => {
    const userGetsX = Math.random() < 0.5;
    setUserIsX(userGetsX);
    setIsUserTurn(userGetsX);
    setMessage(`You are ${userGetsX ? 'X' : 'O'}. ${userGetsX ? 'You start!' : 'Computer starts!'}`);
    setGameStarted(true);

    if (!userGetsX) {
      setTimeout(() => {
        computerMove(Array(9).fill(null));
      }, 500);
    }
  };

  const handleClick = (i) => {
    if (squares[i] || !isUserTurn || calculateWinner(squares)) return;

    const nextSquares = [...squares];
    nextSquares[i] = userIsX ? 'X' : 'O';
    setSquares(nextSquares);
    setIsUserTurn(false);

    setTimeout(() => {
      computerMove(nextSquares);
    }, 500);
  };

  const computerMove = (board) => {
    if (calculateWinner(board) || board.every((square) => square !== null)) return;

    let availableMoves = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[randomMove] = userIsX ? 'O' : 'X';
    setSquares([...board]);
    setIsUserTurn(true);
  };

  let winner = calculateWinner(squares);
  let isDraw = squares.every((square) => square !== null) && !winner;
  let status;

  if (winner) {
    status = winner === (userIsX ? 'X' : 'O') ? 'You Win! 🎉' : 'Computer Wins! 🤖';
  } else if (isDraw) {
    status = 'It\'s a Draw! 🤝';
  } else {
    status = isUserTurn ? 'Your Turn!' : 'Computer\'s Turn...';
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    assignRandomRoles();
  };

  return (
    <div className='board-container'>
      {!gameStarted ? (
        <h2 className="big-message">{message}</h2>
      ) : (
        <>
          <h1>{status}</h1>
          <div className='board'>
            {Array(3).fill(null).map((_, row) => (
              <div className="board-row" key={row}>
                {Array(3).fill(null).map((_, col) => {
                  const index = row * 3 + col;
                  return (
                    <Square
                      key={index}
                      value={squares[index]}
                      onSquareClick={() => handleClick(index)}
                      disabled={!isUserTurn || squares[index] !== null}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          {(winner || isDraw) && <button onClick={handleRestart}>Restart</button>}
        </>
      )}
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default SingleGameBoard;