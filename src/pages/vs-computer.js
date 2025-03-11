import "../styles/bla.css";
import "../styles/board.css";
import SingleGameBoard from "../components/singleGameBoard";
import MagicDustEffect from "../components/magic-dust";
import FireflyEffect from "../components/fireflies";
import Background from "../components/background";

const VsComputer = () => {
  return (
    <div className="bla-container">
      <Background/>
      <MagicDustEffect/>
      <FireflyEffect/>
      <SingleGameBoard/>
    </div>
  );
}

export default VsComputer;