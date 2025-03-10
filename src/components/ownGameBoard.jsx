import '../styles/board.css';
import { useState, useEffect } from 'react';

export default function OwnGameBoard () {

  const [playerX, setplayerX] = useState(null);
  const [turnAnnouncement, setTurnAnnouncement] = useState(false);

  useEffect(()=>{
    decidePlayerX();
  },[])

  function decidePlayerX() {
    if (Math.random() < 0.5) {
      setplayerX('Computer');
    } else {
      setplayerX('User')
    }
    setTurnAnnouncement(true);

    setTimeout(()=>{
      setTurnAnnouncement(false);
    },3000)
  }
 

  return (
    <>
    { turnAnnouncement && <p>turn is {playerX}.</p>}
    </>
  );
}