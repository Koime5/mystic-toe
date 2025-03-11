const XIcon = ({ color = "#ff4655", className = "" }) => (
  <svg viewBox="0 0 100 100" className={`icon x-icon ${className}`}>
    <path
      stroke={color}
      strokeWidth="15"
      strokeLinecap="round"
      d="M20,20 L80,80 M80,20 L20,80"
    />
  </svg>
);

const OIcon = ({ color = "#2cb67d", className = "" }) => (
  <svg viewBox="0 0 100 100" className={`icon o-icon ${className}`}>
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke={color}
      strokeWidth="15"
      fill="transparent"
    />
  </svg>
);

const Square = ({ value, onSquareClick, isDisabled, isWinning, hasWinner, isDraw }) => {

  const getClassName = () => {
    if (isDraw) return 'icon-draw';
    if (hasWinner) return isWinning ? (value === 'X' ? 'x-icon-win' : 'o-icon-win') : 'icon-muted';
    return value === 'X' ? 'x-icon' : 'o-icon';
  };

  return (
    <button 
      className="square"
      onClick={onSquareClick}
      disabled={isDisabled || hasWinner || isDraw} // Prevent clicks after game ends
    >
      {value === 'X' && <XIcon className={getClassName()} />}
      {value === 'O' && <OIcon className={getClassName()} />}
    </button>
  );
};

export default Square;