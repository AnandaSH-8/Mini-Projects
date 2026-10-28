import { useState } from "react";
import styles from "../styles/check-parity.module.css";

export default function CheckParity() {
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
    <main className={styles.parityContainer}>
      <section className={styles["checker-card"]}>
        <h1>Even or Odd Checker</h1>

        <form onSubmit={handleCheck}>
          <input
            type="text"
            name="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            placeholder="Enter a number"
            aria-label="Enter a number"
          />

          <button type="submit">Check</button>
        </form>

        {result && (
          <p className={styles.result} role="status">
            {result}
          </p>
        )}
      </section>
    </main>
  );
}
