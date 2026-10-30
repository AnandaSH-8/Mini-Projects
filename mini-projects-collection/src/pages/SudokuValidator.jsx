import { useState } from "react";
import styles from "../styles/sudokuValidator.module.css";

const createEmptyBoard = () =>
  Array.from({ length: 9 }, () => Array(9).fill(""));

function SudokuValidator() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [message, setMessage] = useState("");
  const [conflictingCells, setConflictingCells] = useState([]);

  const isConflicting = (row, col) =>
    conflictingCells.some((cell) => cell.row === row && cell.col === col);

  const handleCellChange = (row, col, value) => {
    if (value !== "" && !/^[1-9]$/.test(value)) {
      return;
    }

    const updatedBoard = board.map((currentRow) => [...currentRow]);
    updatedBoard[row][col] = value;

    setBoard(updatedBoard);

    setMessage("");
    setConflictingCells([]);
  };

  const validateSudoku = () => {
    const conflicts = new Set();

    const addConflicts = (positions) => {
      const seen = new Map();

      positions.forEach(([row, col]) => {
        const value = board[row][col];

        if (!value) return;

        if (seen.has(value)) {
          const previousPositions = seen.get(value);

          previousPositions.forEach(([r, c]) => {
            conflicts.add(`${r}-${c}`);
          });

          conflicts.add(`${row}-${col}`);
        } else {
          seen.set(value, [[row, col]]);
        }

        if (seen.has(value)) {
          const existing = seen.get(value);

          if (!existing.some(([r, c]) => r === row && c === col)) {
            existing.push([row, col]);
          }
        }
      });
    };

    for (let row = 0; row < 9; row++) {
      const positions = Array.from({ length: 9 }, (_, col) => [row, col]);

      addConflicts(positions);
    }

    for (let col = 0; col < 9; col++) {
      const positions = Array.from({ length: 9 }, (_, row) => [row, col]);

      addConflicts(positions);
    }

    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
      for (let boxCol = 0; boxCol < 9; boxCol += 3) {
        const positions = [];

        for (let row = boxRow; row < boxRow + 3; row++) {
          for (let col = boxCol; col < boxCol + 3; col++) {
            positions.push([row, col]);
          }
        }

        addConflicts(positions);
      }
    }

    const conflictPositions = Array.from(conflicts).map((position) => {
      const [row, col] = position.split("-").map(Number);
      return { row, col };
    });

    setConflictingCells(conflictPositions);

    if (conflictPositions.length > 0) {
      setMessage("Invalid Sudoku! Conflicts found.");
    } else {
      setMessage("Sudoku is valid so far!");
    }
  };

  const handleClear = () => {
    setBoard(createEmptyBoard());
    setMessage("");
    setConflictingCells([]);
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1>Sudoku Validator</h1>
          <p>Enter numbers 1-9 and validate the board.</p>
        </header>

        <div className="board">
          {board.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`cell ${
                  isConflicting(rowIndex, colIndex) ? "invalid" : ""
                }`}
                value={value}
                onChange={(event) =>
                  handleCellChange(rowIndex, colIndex, event.target.value)
                }
                aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}`}
              />
            )),
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.validateButton}
            onClick={validateSudoku}
          >
            Validate
          </button>

          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        {message && (
          <p
            className={`${styles.message} ${
              conflictingCells.length > 0
                ? styles.errorMessage
                : styles.successMessage
            }`}
            role="status"
          >
            {conflictingCells.length > 0 ? "❌ " : "✅ "}
            {message}
          </p>
        )}
      </section>
    </main>
  );
}

export default SudokuValidator;
