import React, { useEffect, useState } from 'react';
import './App.css';

const wordnik = 'https://api.wordnik.com/v4/words.json/randomWord?&minLength=5&maxLength=-1&api_key=';
const API_KEY = 'your_actual_api_key_here';

function App() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  useEffect(() => {
    fetch(wordnik + API_KEY)
      .then(res => res.json())
      .then(json => setWord(json.word.toUpperCase()))
      .catch(err => console.log(err.message));
  }, []);

  const handleGuess = (letter) => {
    if (word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const renderWord = () => {
    return word.split('').map((letter, index) => (
      guessedLetters.includes(letter) ? letter : '_'
    )).join(' ');
  };

  const renderAlphabet = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return alphabet.map(letter => (
      <button key={letter} onClick={() => handleGuess(letter)} disabled={guessedLetters.includes(letter) || wrongGuesses >= 6}>
        {letter}
      </button>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hangman</h1>
      </header>
      <div className="game-container">
        <h2>Who Says Learning Can't Be FUN?</h2>
        <p>Improve your skills in Frontend Web Development by playing an intuitive game. We ensure all questions are up to date so you don't go out of style while improving your skills.</p>
        <button>GET STARTED</button>
        <button>LEARN MORE</button>
        <div className="word-display">{renderWord()}</div>
        <div className="alphabet-buttons">{renderAlphabet()}</div>
        <div className="wrong-guesses">Wrong guesses: {wrongGuesses}</div>
        {wrongGuesses >= 6 && <div>You lost! The word was {word}</div>}
      </div>
      <footer>
        <p>FE Hangman is designed to make learning easier and more fun, take up exciting challenges, choose levels and contest in duels!</p>
        <div>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Levels</a>
          <a href="/">Contact Us</a>
        </div>
        <p>&copy; 2024 Group 2</p>
      </footer>
    </div>
  );
}

export default App;