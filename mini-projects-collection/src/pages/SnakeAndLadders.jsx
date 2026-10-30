import { useState } from "react";
import styles from "../styles/SnakeAndLadders.module.css";

const LADDERS = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  63: 81,
  71: 91,
};

const SNAKES = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

const createBoard = () => {
  const rows = [];

  for (let row = 0; row < 10; row++) {
    const start = 100 - row * 10;
    const numbers = Array.from({ length: 10 }, (_, index) => start - index);

    if (row % 2 === 1) {
      numbers.reverse();
    }

    rows.push(numbers);
  }

  return rows;
};

const BOARD_ROWS = createBoard();

function SnakeAndLadders() {
  const [positions, setPositions] = useState({
    P1: 1,
    P2: 1,
  });

  const [currentPlayer, setCurrentPlayer] = useState("P1");
  const [diceValue, setDiceValue] = useState(null);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleRollDice = () => {
    if (gameOver) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);

    const oldPosition = positions[currentPlayer];
    const nextPosition = oldPosition + roll;

    if (nextPosition > 100) {
      setCurrentPlayer(currentPlayer === "P1" ? "P2" : "P1");
      return;
    }

    let finalPosition = nextPosition;

    if (LADDERS[finalPosition]) {
      finalPosition = LADDERS[finalPosition];
    } else if (SNAKES[finalPosition]) {
      finalPosition = SNAKES[finalPosition];
    }

    const updatedPositions = {
      ...positions,
      [currentPlayer]: finalPosition,
    };

    setPositions(updatedPositions);

    if (finalPosition === 100) {
      setWinner(currentPlayer);
      setGameOver(true);
      return;
    }

    setCurrentPlayer(currentPlayer === "P1" ? "P2" : "P1");
  };

  const handleReset = () => {
    setPositions({
      P1: 1,
      P2: 1,
    });

    setCurrentPlayer("P1");
    setDiceValue(null);
    setWinner(null);
    setGameOver(false);
  };

  const getCellPlayers = (number) => {
    const players = [];

    if (positions.P1 === number) players.push("P1");
    if (positions.P2 === number) players.push("P2");

    return players;
  };

  const getSpecialMove = (number) => {
    if (LADDERS[number]) {
      return {
        type: "ladder",
        destination: LADDERS[number],
      };
    }

    if (SNAKES[number]) {
      return {
        type: "snake",
        destination: SNAKES[number],
      };
    }

    return null;
  };

  return (
    <main className={styles.page}>
      <section className={styles.gameCard}>
        <h1 className={styles.heading}>Snake &amp; Ladders</h1>

        <div className={styles.topBar}>
          <div className={styles.turn}>
            {winner ? (
              <>
                {winner === "P1" ? "🏆 Player 1 wins!" : "🏆 Player 2 wins!"}
                <span className={styles.loserMessage}>
                  {winner === "P1" ? "🎉 Player 2 loses" : "🎉 Player 1 loses"}
                </span>
              </>
            ) : (
              <>
                <span>Turn:</span>
                <strong
                  className={
                    currentPlayer === "P1" ? styles.p1Badge : styles.p2Badge
                  }
                >
                  {currentPlayer}
                </strong>
              </>
            )}
          </div>

          <div className={styles.legend}>
            <span>
              <i className={styles.p1Dot}></i> P1
            </span>
            <span>
              <i className={styles.p2Dot}></i> P2
            </span>
          </div>
        </div>

        <div className={styles.board}>
          {BOARD_ROWS.flat().map((number) => {
            const players = getCellPlayers(number);
            const specialMove = getSpecialMove(number);

            return (
              <div className={styles.cell} key={number}>
                <span className={styles.cellNumber}>{number}</span>

                {specialMove && (
                  <span
                    className={
                      specialMove.type === "ladder"
                        ? styles.ladderLabel
                        : styles.snakeLabel
                    }
                  >
                    {specialMove.type === "ladder" ? "L" : "S"}→
                    {specialMove.destination}
                  </span>
                )}

                {players.length > 0 && (
                  <div className={styles.playerTokens}>
                    {players.map((player) => (
                      <span
                        key={player}
                        className={
                          player === "P1" ? styles.p1Token : styles.p2Token
                        }
                      >
                        {player}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.rollButton}
            onClick={handleRollDice}
            disabled={gameOver}
          >
            🎲 Roll Dice{gameOver ? " (0)" : diceValue ? ` (${diceValue})` : ""}
          </button>

          <button
            type="button"
            className={styles.resetButton}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <p className={styles.rules}>
          Exact 100 is required to win. Land on a ladder to climb up, a snake to
          slide down.
        </p>
      </section>
    </main>
  );
}

export default SnakeAndLadders;
