import { motion } from "framer-motion";

const LinkButton = ({ action, name, handleRoute, className }) => {
  return (
    <motion.button
      onClick={() => handleRoute(action)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={className}
    >
      {name}
    </motion.button>
  );
};

export default LinkButton;