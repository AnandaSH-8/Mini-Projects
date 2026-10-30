import { useState } from "react";
import styles from "../styles/tictactoe.module.css";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const INITIAL_BOARD = Array(9).fill("");

function TicTacToe() {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    draws: 0,
  });
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentTurn;

    setBoard(updatedBoard);

    const winningCombination = WINNING_COMBINATIONS.find(
      ([a, b, c]) =>
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[b] === updatedBoard[c],
    );

    if (winningCombination) {
      setWinner(currentTurn);
      setWinningCells(winningCombination);

      setScores((previousScores) => ({
        ...previousScores,
        [currentTurn]: previousScores[currentTurn] + 1,
      }));

      return;
    }

    if (updatedBoard.every((cell) => cell !== "")) {
      setWinner("Draw");

      setScores((previousScores) => ({
        ...previousScores,
        draws: previousScores.draws + 1,
      }));

      return;
    }

    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  };

  const restartRound = () => {
    setBoard([...INITIAL_BOARD]);
    setCurrentTurn("X");
    setWinner(null);
    setWinningCells([]);
  };

  const resetAll = () => {
    restartRound();

    setScores({
      X: 0,
      O: 0,
      draws: 0,
    });
  };

  const getStatusMessage = () => {
    if (winner === "Draw") {
      return "It's a Draw!";
    }

    if (winner) {
      return `Winner: ${winner}`;
    }

    return `Turn: ${currentTurn}`;
  };

  return (
    <main className={styles.page}>
      <section className={styles.gameCard}>
        <h1 className={styles.heading}>Tic-Tac-Toe</h1>

        <div className={styles.scoreBoard}>
          <div className={`${styles.scoreCard} ${styles.xScore}`}>
            <span>X: </span>
            <strong>{scores.X}</strong>
          </div>

          <div className={styles.scoreCard}>
            <span>Draws: </span>
            <strong>{scores.draws}</strong>
          </div>

          <div className={`${styles.scoreCard} ${styles.oScore}`}>
            <span>O: </span>
            <strong>{scores.O}</strong>
          </div>
        </div>

        <p
          className={`${styles.status} ${
            winner && winner !== "Draw" ? styles.winnerStatus : ""
          }`}
          aria-live="polite"
        >
          {getStatusMessage()}
        </p>

        <div className={styles.board}>
          {board.map((cell, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.cell} ${
                winningCells.includes(index) ? styles.winningCell : ""
              }`}
              onClick={() => handleCellClick(index)}
              disabled={Boolean(cell) || Boolean(winner)}
              aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ", empty"}`}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.restartButton}
            onClick={restartRound}
          >
            {winner ? "Play Again" : "Restart Round"}
          </button>

          <button
            type="button"
            className={styles.resetButton}
            onClick={resetAll}
          >
            Reset All
          </button>
        </div>
      </section>
    </main>
  );
}

export default TicTacToe;
