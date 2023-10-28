import React from "react";
import { Badge } from "react-bootstrap";

const Word = ({ word, guessedLetters }) => {
  const displayWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  return (
    <h3>
      {displayWord.split(" ").map((letter, index) => (
        <Badge
          key={index}
          variant={guessedLetters.includes(letter) ? "primary" : "secondary"}
        >
          {letter}
        </Badge>
      ))}
    </h3>
  );
};

export default Word;
