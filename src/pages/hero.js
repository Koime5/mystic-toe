import "../styles/hero.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinkButton from "../components/button";
import Background from "../components/background";
import MagicDustEffect from "../components/magic-dust";
import FireflyEffect from "../components/fireflies";

const Home = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Mystic Toe");
  const [buttons, setButtons] = useState([
    { name: "Single Player", action: "online" },
    { name: "Multi Player", action: "friends" },
  ]);

  const [prevState, setPrevState] = useState(null);

  const handleRoute = (path) => {
    const routes = {
      online: {
        title: "Single Player",
        buttons: [
          { name: "Play with Computer", action: "vs-computer" },
          { name: "Random Opponent", action: "random-opponent" },
        ],
      },
      friends: {
        title: "Multi Player",
        buttons: [
          { name: "Create Room", action: "create-room" },
          { name: "Join Room", action: "join-room" },
        ],
      },
    };

    if (routes[path]) {
      setPrevState({ title, buttons });
      setTitle(routes[path].title);
      setButtons([...routes[path].buttons, { name: "<- Go Back", action: "back" }]);
    } else if (path === "back") {
      if (prevState) {
        setTitle(prevState.title);
        setButtons(prevState.buttons);
        setPrevState(null);
      }
    } else {
      navigate(`/${path}`);
    }
  };

  return (
    <div className="container">
      <Background />
      <MagicDustEffect/>
      <FireflyEffect/>

      <AnimatePresence mode="wait">
        <motion.h1
          key={title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="heading"
        >
          {title}
        </motion.h1>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
      >
        {buttons.map((btn, index) => (
          <motion.div
            key={btn.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (index * 0.1) + 0.3 }}
          >
            <LinkButton
              handleRoute={handleRoute}
              action={btn.action}
              name={btn.name}
              className={btn.action === 'back' ? 'back-button' : 'glassy-button'}
            />
          </motion.div>
        ))}
      </motion.div>

      <footer>
        <p>
          Developed by <a href="">Koime5th</a>.
        </p>
      </footer>
    </div>
  );
};

export default Home;