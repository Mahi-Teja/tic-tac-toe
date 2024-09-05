import { useCallback, useEffect, useState } from "react";

const patterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const App = () => {
  const gameGrid = ["", "", "", "", "", "", "", "", ""];
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [game, setGame] = useState(true);
  const [turn, setTurn] = useState(true);
  const [msg, setMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [xPosition, setXPosition] = useState(Array(3).fill(""));
  const [yPosition, setYPosition] = useState(Array(3).fill(""));
  const emoji = ["❌", "🇴"]; // emojis
  // const emoji = ["X", "O"]; // letters

  const player = turn ? emoji[0] : emoji[1];

  useEffect(() => {
    if (!game) return;
    let winner = null;
    patterns.map((patern, i) => {
      const [a, b, c] = patern;
      // console.log(a, b, c);
      // console.log(
      //   `pattern:  a:${grid[a - 1]}, b:${grid[b - 1]}, c:${grid[c - 1]}`
      // );
      // console.log("pattern: --");
      if (
        grid[a - 1] &&
        grid[a - 1] === grid[b - 1] &&
        grid[a - 1] === grid[c - 1]
      ) {
        // console.log(`${grid[a - 1]} Won`);
        winner = grid[a - 1];
      }

      if (winner) {
        setMsg(`${winner.toUpperCase()} Won`);
        setGame(false);
      } else if (grid.every((cell) => cell !== "")) {
        setMsg("Its a TIE");
        setGame(false);
      } else {
        setGame(true);
      }
    });
  }, [grid]);

  const handleClick = (e, i) => {
    setErrorMsg(null);
    // if cell \is not empty
    if (e.target.value) {
      setErrorMsg("Choose an empty Cell");
      return;
    }
    // cell not empty and game is on
    if (game) {
      e.target.value = player;
      const arr = [...grid];
      arr[i] = player;
      // update array with respective index position
      setGrid(arr);
      // change turn
      setTurn((prevTurn) => !prevTurn);
    }
  };
  // reset Logic
  const resetGame = () => {
    setGame(true);
    setMsg(null);
    setTurn(true);
    setErrorMsg(null);
    setGrid(Array(9).fill(""));
    document.querySelectorAll("input").forEach((i) => (i.value = ""));
  };

  // console.log("grid: ", grid);
  // console.log("game: ", game);

  return (
    <div>
      <h1 className="title">Tic Tac Toe</h1>
      <div className="top-title">
        <h3 className={``}>{game ? `${player} 's trun` : msg}</h3>
        <button className="reset" onClick={(e) => resetGame(e)}>
          Reset
        </button>
      </div>
      <div className={`game ${game ? "" : "no-click"}`}>
        {/* renderning boxes */}
        {grid.map((box, index) => (
          <input
            className={`block ${grid[index] ? "filled" : ""} ${
              grid[index] == `${emoji[0] || "X"}` ? "red" : "green"
            }`}
            key={index}
            id={index + 1}
            onClick={(e) => handleClick(e, index)}
            readOnly
          ></input>
        ))}
      </div>
      <h3 className="error-message">{errorMsg ? errorMsg : null}</h3>
    </div>
  );
};

export default App;
