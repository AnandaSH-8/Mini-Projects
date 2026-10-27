import { useState, useEffect } from "react";
import "../styles/alphabets.css";

export function Alphabets() {
  const [output, setOutput] = useState("");

  const handleLetterClick = (letter) => {
    setOutput((prev) => prev + letter);
  };

  const handleBackspace = () => {
    setOutput((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (/^[a-z]$/i.test(event.key)) {
        setOutput((prev) => prev + event.key.toUpperCase());
      } else if (event.key === "Backspace") {
        event.preventDefault();
        handleBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <main className="app-container">
      <section className="alphabet-card">
        <header className="card-header">
          <h1>Alphabet Buttons</h1>
          <p>Click letters (or use your keyboard) to build text.</p>
        </header>

        <div className="output" aria-live="polite">
          {output || (
            <span className="placeholder">Your text will appear here...</span>
          )}
        </div>

        <div className="backspace-container">
          <button
            type="button"
            className="backspace-button"
            onClick={handleBackspace}
          >
            Backspace
          </button>
        </div>

        <div className="alphabet-grid">
          {letters.map((letter) => (
            <button
              type="button"
              className="key"
              key={letter}
              onClick={() => handleLetterClick(letter)}
              aria-label={letter}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
