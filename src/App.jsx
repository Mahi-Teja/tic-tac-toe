import { useState } from "react";
import TicTacToe from "./pages/TicTacToe";
import TicTacToss from "./pages/TicTacToss";
import Header from "./components/Header";

const App = ({ target }) => {
  const [mode, setMode] = useState(true);
  target ? setMode(target) : "";
  return (
    <div>
      <Header setMode={setMode} mode={mode} />
      <div className="play-ground">{mode ? <TicTacToe /> : <TicTacToss />}</div>
    </div>
  );
};

export default App;
