import React from "react";

const Header = ({ setMode, mode }) => {
  return (
    <div className="main-title ">
      <h2 className="title text-center">
        {mode ? "Tic Tac Toe" : "Tic Tac Toss"}
      </h2>
      <button className="game__mode" onClick={() => setMode((pre) => !pre)}>
        {mode ? "Play Toss" : "Play Toe"}
      </button>
    </div>
  );
};

export default Header;
