import React, { useEffect } from "react";
import "../styles/magicdust.css"

const MagicDustEffect = () => {
  
  useEffect(() => {
    
    const handleMouseMove = (e) => {
      createMagicDust(e.clientX, e.clientY);
    };

    
    const handleTouchMove = (e) => {
      let touch = e.touches[0];
      createMagicDust(touch.clientX, touch.clientY);
    };

    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  
  function createMagicDust(x, y) {
    for (let i = 0; i < 6; i++) { 
      const dust = document.createElement("div");
      dust.classList.add("magic-dust");

      const size = Math.random() * 4 + 2; 
      dust.style.width = `${size}px`;
      dust.style.height = `${size}px`;
      dust.style.left = `${x + randomOffset()}px`;
      dust.style.top = `${y + randomOffset()}px`;
      dust.style.backgroundColor = getRandomColor(); 

      document.body.appendChild(dust);

      setTimeout(() => dust.remove(), 200);
    }
  }

  
  function getRandomColor() {
    const colors = ["#ff1493", "#00ffcc", "#ffcc00", "#ff4500", "#8a2be2", "#00ff00"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  
  function randomOffset() {
    return (Math.random() - 0.5) * 14; 
  }

  return null; 
};

export default MagicDustEffect;