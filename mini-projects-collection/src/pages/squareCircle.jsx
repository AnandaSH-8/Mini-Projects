import styles from "../styles/squareCircle.module.css";

function SquareCircle() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <h1 className={styles.heading}>Square &amp; Circle</h1>

        <div className="square">
          <div className="circle"></div>
        </div>
      </section>
    </main>
  );
}

export default SquareCircle;
