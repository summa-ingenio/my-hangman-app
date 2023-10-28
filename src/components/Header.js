import React from "react";

const Header = ({ onReset, onHelp }) => {
  const headerStyle = {
    backgroundColor: "#343a40",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0 0.5rem",
  };

  //Header Conponent with some styling

  return (
    <div style={headerStyle}>
      <div>HANGMAN GAME</div>
      <div>
        <button style={buttonStyle} onClick={onReset}>
          Reset
        </button>
        <button style={buttonStyle} onClick={onHelp}>
          Help
        </button>
      </div>
    </div>
  );
};

export default Header;
