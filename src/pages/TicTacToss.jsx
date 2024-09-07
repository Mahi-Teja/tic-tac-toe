import { useCallback, useEffect, useState } from "react";
import Model from "../components/Model";

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
const TicTacToss = () => {
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [game, setGame] = useState(true);
  const [turn, setTurn] = useState(true);
  const [msg, setMsg] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [xPosition, setXPosition] = useState([]);
  const [yPosition, setYPosition] = useState([]);
  const [dimBox, setDimBox] = useState([]);
  const emoji = ["❌", "🇴"]; // emojis
  // const emoji = ["X", "O"]; // letters

  const player = turn ? emoji[0] : emoji[1];

  function replaceXValue(arr, set, v) {
    const changeIndex = arr[0];
    // updating grid
    const grArr = [...grid];
    grArr[changeIndex] = "";
    grArr[v] = player;
    //updating position of X or O
    arr.shift();
    arr.push(v);
    setGrid(grArr);
    set(arr);
    setTurn((prevTurn) => !prevTurn);

    // console.log(arr);
  }

  // check for winner evrey turn
  useEffect(() => {
    if (!game) return;
    let winner = null;
    patterns.map((patern, i) => {
      const [a, b, c] = patern;
      //   const [x, y, z] = xPosition.sort();

      if (
        xPosition.includes(a - 1) &&
        xPosition.includes(b - 1) &&
        xPosition.includes(c - 1)
      ) {
        winner = emoji[0];
      }
      if (
        yPosition.includes(a - 1) &&
        yPosition.includes(b - 1) &&
        yPosition.includes(c - 1)
      ) {
        // console.log(`${yPosition[a - 1]} Won`);
        winner = emoji[1];
      }
      // Display Winner end game
      if (winner) {
        setMsg(`${winner.toUpperCase()} Won`);
        setGame(false);
      }
    });
    dimIt();
    setTimeout(() => {}, 500);
  }, [grid]);

  //dim the next to be tossed position
  function dimIt() {
    let dimArr = [...dimBox];
    if (xPosition.length == 3 && player == emoji[0]) {
      dimArr[0] = xPosition[0];
      setDimBox(dimArr);
    }
    if (yPosition.length == 3 && player == emoji[1]) {
      dimArr[1] = yPosition[0];
      setDimBox(dimArr);
    }
  }

  // position is selected
  const handleClick = (e, i) => {
    setErrorMsg(null);
    // if cell is not empty
    if (grid[i]) {
      setErrorMsg("invalid move!!");
      return;
    }

    // cell not empty and game is on
    if (game) {
      if (player == emoji[0]) {
        // X's turn
        if (xPosition.length >= 3) {
          // 3 X's placed
          replaceXValue(xPosition, setXPosition, i); // tossing
          return;
        }
        setXPosition((pre) => [...pre, i]); // first 3 X's
      }
      if (player == emoji[1]) {
        // O's turn
        if (yPosition.length >= 3) {
          // 3 O's placed
          replaceXValue(yPosition, setYPosition, i); // tossing
          return;
        }
        setYPosition((pre) => [...pre, i]); // first 3 O's
      }
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

    // TOSS
    setDimBox([]);
    setXPosition([]);
    setYPosition([]);
  };
  return (
    <div>
      <h3 className="error-message">{errorMsg ? errorMsg : null}</h3>

      <div className="top-title">
        <h3 className={`display-message`}>
          {game ? `${player} 's trun` : msg}
        </h3>

        <div className="flex">
          <button className="reset" onClick={(e) => resetGame(e)}>
            Reset
          </button>
          <button
            title="Rules"
            className="rules-button"
            onClick={() => setShowRules((pre) => !pre)}
          >
            <i className="fa-regular fa-circle-question"></i>
          </button>
        </div>
        <Model show={showRules} setShow={setShowRules} title={"Rules:"}>
          <div className="">
            <ul className="rules-list">
              <li>
                Tic-Tac-Toss is a twist on the classic Tic-Tac-Toe game. There
                is no Draw!
              </li>
              <li>First 3 symbols are played same as Tic-Tac-Toe</li>
              <li>
                However, after placing three symbols, players can "toss" or swap
                the positions of first placed symbol on the board to next
                selecting position.{" "}
              </li>
              <li>
                The game continues until a player forms a line of three in a
                row, with the added strategy of repositioning Symbols to block
                the opponent or complete their own winning sequence.
              </li>
            </ul>
            <p>
              NOTE : The symbol which is going to swap has a Neon-light to it
            </p>
          </div>
        </Model>
      </div>
      <div className={`game ${game ? "" : "no-click"}`}>
        {/* renderning boxes */}
        {grid.map((box, index) => (
          <div
            className={`
              block blue-bg
              ${grid[index] ? "filled" : ""} 
              ${grid[index] == `${emoji[0] || "X"}` ? "red" : "green"}
            ${
              game && (dimBox[0] == index || dimBox[1] == index)
                ? grid[index] == (emoji[0] || "X")
                  ? "red-neon"
                  : "blue-neon"
                : ""
            }
            
            `}
            key={index}
            id={index + 1}
            onClick={(e) => handleClick(e, index)}
            value={grid[index]}
            readOnly
          >
            {grid[index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicTacToss;
