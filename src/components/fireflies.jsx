import React, { useEffect } from 'react';
import '../styles/fireflies.css'; 

const FireflyEffect = () => {
  useEffect(() => {
    const firefliesContainer = document.querySelector(".fireflies-container");
    const numFireflies = 30; // fireflies amt

    for (let i = 0; i < numFireflies; i++) {
      const firefly = document.createElement("div");
      firefly.classList.add("firefly");
      firefliesContainer.appendChild(firefly);

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      firefly.style.left = `${x}px`;
      firefly.style.top = `${y}px`;

      animateFirefly(firefly);
    }

    function animateFirefly(firefly) {
      const duration = Math.random() * 10 + 5; // movement
      const xMovement = (Math.random() - 0.5) * window.innerWidth * 0.5;
      const yMovement = (Math.random() - 0.5) * window.innerHeight * 0.5;

      firefly.animate([
        { transform: `translate(0, 0)`, opacity: 0.7 },
        { transform: `translate(${xMovement}px, ${yMovement}px)`, opacity: 1 }
      ], {
        duration: duration * 1000,  
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out"
      });
    }

    
    return () => {
      const fireflies = document.querySelectorAll(".firefly");
      fireflies.forEach(firefly => firefly.remove());
    };
  }, []);

  return <div className="fireflies-container"></div>;
};

export default FireflyEffect;