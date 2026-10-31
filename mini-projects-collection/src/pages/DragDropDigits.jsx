import { useState } from "react";
import styles from "../styles/DragDropDigits.module.css";

const INITIAL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function DragDropDigits() {
  const [digits, setDigits] = useState(INITIAL_DIGITS);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (event, index) => {
    setDraggedIndex(index);

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";

    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();

    const sourceIndex = draggedIndex;

    if (sourceIndex === null || sourceIndex === targetIndex) {
      handleDragEnd();
      return;
    }

    setDigits((previousDigits) => {
      const updatedDigits = [...previousDigits];

      const [draggedDigit] = updatedDigits.splice(sourceIndex, 1);

      updatedDigits.splice(targetIndex, 0, draggedDigit);

      return updatedDigits;
    });

    handleDragEnd();
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1>Drag &amp; Drop Digits</h1>
          <p>Drag the boxes to reorder the digits 0–9.</p>
        </header>

        <div className={styles.grid}>
          {digits.map((digit, index) => (
            <div
              key={digit}
              className={`${styles.digitBox}
                ${draggedIndex === index ? styles.dragging : ""}
                ${dragOverIndex === index ? styles.dragOver : ""}
              `}
              draggable={true}
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={(event) => handleDragOver(event, index)}
              onDrop={(event) => handleDrop(event, index)}
              onDragEnd={handleDragEnd}
              onDragLeave={() => {
                if (dragOverIndex === index) {
                  setDragOverIndex(null);
                }
              }}
            >
              {digit}
            </div>
          ))}
        </div>

        <p className={styles.tip}>
          Tip: Try reordering to make <code>0123456789</code> or reverse it!
        </p>
      </section>
    </main>
  );
}

export default DragDropDigits;
