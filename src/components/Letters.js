import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

//Building out the letters

const Letters = ({ guessedLetters, onLetterClick }) => {
  const availableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLetterClick = (letter) => {
    onLetterClick(letter);
  };

  return (
    <div className="letters">
      {availableLetters.map((letter, index) => (
        <button
          key={index}
          onClick={() => handleLetterClick(letter)}
          disabled={guessedLetters.includes(letter)}
          style={{ margin: "5px" }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Letters;
