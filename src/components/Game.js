import React, { useState, useEffect } from "react";
import Header from "./Header";
import Word from "./Word";
import Letters from "./Letters";
import { Alert, Container, Row, Col } from "react-bootstrap";
import "../App.css";
import hangman1 from "../images/hangman1.png";
import hangman2 from "../images/hangman2.png";
import hangman3 from "../images/hangman3.png";
import hangman4 from "../images/hangman4.png";
import hangman5 from "../images/hangman5.png";
import hangman6 from "../images/hangman6.png";
import hangman7 from "../images/hangman7.png";
import hangman8 from "../images/hangman8.png";
import hangman9 from "../images/hangman9.png";
import hangman10 from "../images/hangman10.png";
import hangman11 from "../images/hangman11.png";

const Game = () => {
  const [hangmanStage, setHangmanStage] = useState(1); // Keep track of hangman image stage
  const [wordToGuess, setWordToGuess] = useState(``); // Replace with logic to select random words
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attempts, setAttempts] = useState(6); // Number of attempts
  const [gameStatus, setGameStatus] = useState("playing"); // 'won', 'lost', or 'playing'
  const [revealedWord, setRevealedWord] = useState("");

  useEffect(() => {
    setGameStatus("playing"); // Set the game status to "playing" on page load
    fetchRandomWord();
  }, []);

  //API call to get a random word

  const fetchRandomWord = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word"
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setWordToGuess(data[0]);
        }
      } else {
        throw new Error("Failed to fetch the random word.");
      }
    } catch (error) {
      console.error(error);
      // Handle error: set default word or show an error message
      setWordToGuess("TESTING"); // Set a default word in case of an error
    }
  };

  useEffect(() => {
    if (gameStatus === "lost") {
      setRevealedWord(wordToGuess);
    }
  }, [gameStatus, wordToGuess]);

  // Handle any of the letters being selected

  const handleLetterClick = (character) => {
    if (attempts > 0 && gameStatus === "playing") {
      const lowerCaseCharacter = character.toLowerCase();
      const lowerCaseWord = wordToGuess.toLowerCase();

      if (!lowerCaseWord.includes(lowerCaseCharacter)) {
        setAttempts(attempts - 1);
        setHangmanStage(hangmanStage + 1);
      }
      setGuessedLetters([...guessedLetters, lowerCaseCharacter]);
    }
    checkGameStatus();
  };

  //Continuesly check the game status

  const checkGameStatus = () => {
    const uniqueWordSet = new Set(wordToGuess.toLowerCase());
    const uniqueGuessedSet = new Set(guessedLetters);

    const remainingWordSet = new Set(
      [...uniqueWordSet].filter((char) => !uniqueGuessedSet.has(char))
    );

    if (remainingWordSet.size === 1) {
      console.log("Game Status: won");
      setGameStatus("won");
    } else if (attempts === 1) {
      console.log("Game Status: lost");
      setGameStatus("lost");
    } else {
      console.log("Game Status: playing");
    }
  };

  const handleReset = () => {
    window.location.reload(); // Reload the page
  };

  //Help for the user
  const handleHelp = () => {
    alert(`Welcome to Hangman! 
    
    Gameplay: 
    
    Players guess letters to fill in the blanks. 
    Correct guesses fill in the spaces; incorrect guesses result in drawing a part of the hangman.
    
    Hangman Progress:
    
    With each wrong guess, a part of the hangman is drawn, such as head, body, arms, legs, etc.

    Winning and Losing:
    
    Guessers win by guessing the word before the hangman is complete.
    Word selector wins if the hangman is fully drawn before the word is guessed.
    
    Tips:
    
    Set a theme or category for the word.
    Variations exist, like limiting the incorrect guesses.`);
  };

  return (
    <div>
      <Header onReset={handleReset} onHelp={handleHelp} />
      <div className="game-container">
        <Container className="mt-3">
          <Row className="justify-content-md-center">
            <Col md="6">
              {gameStatus === "lost" ? ( // Render last image only when lost
                <img
                  src={require(`../images/hangman11.png`)} // Display last image when lost
                  alt={`Hangman Stage 11`}
                  width="300"
                  height="300"
                />
              ) : (
                <div className="hangman-images">
                  <img
                    src={require(`../images/hangman${hangmanStage}.png`)} // Dynamically load hangman image based on stage
                    alt={`Hangman Stage ${hangmanStage}`}
                    width="300"
                    height="300"
                  />
                </div>
              )}
              <div className="word-section">
                {" "}
                <Word word={wordToGuess} guessedLetters={guessedLetters} />
              </div>
              <Alert
                variant={
                  gameStatus === "won"
                    ? "success"
                    : gameStatus === "lost"
                    ? "danger"
                    : "primary"
                }
              >
                <div className="attempts-section">
                  {" "}
                  <p>
                    {gameStatus === "won"
                      ? "You won!"
                      : gameStatus === "lost"
                      ? `You lost! The word was: ${revealedWord}`
                      : `Attempts left: ${attempts}`}{" "}
                  </p>
                </div>
              </Alert>
              <Letters
                guessedLetters={guessedLetters}
                onLetterClick={handleLetterClick}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Game;
