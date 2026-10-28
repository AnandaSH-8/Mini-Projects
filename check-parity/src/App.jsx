import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = (event) => {
    event.preventDefault();

    const trimmedNumber = number.trim();

    if (trimmedNumber === "" || isNaN(Number(trimmedNumber))) {
      setResult("Not a valid number!");
      return;
    }

    const value = Number(trimmedNumber);

    if (value % 2 === 0) {
      setResult(`The number ${trimmedNumber} is even!`);
    } else {
      setResult(`Oops, ${trimmedNumber} is odd!`);
    }
  };

  return (
    <main className="app-container">
      <section className="checker-card">
        <h1>Even or Odd Checker</h1>

        <form onSubmit={handleCheck}>
          <input
            type="number"
            name="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            placeholder="Enter a number"
            aria-label="Enter a number"
          />

          <button type="submit">Check</button>
        </form>

        {result && (
          <p className="result" role="status">
            {result}
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
