import { Link } from "react-router-dom";
import styles from "../styles/index.module.css";

export default function MainApp() {
  return (
    <div className={styles.mainContainer}>
      <h1>This is the Introduction Page for Mini Projects Collection</h1>
      <h2>Mini Projects Collection</h2>
      <div className={styles.linksContainer}>
        <Link to="/checkparity">Check Parity</Link>

        <Link to="/addtolist">Add Items to List</Link>

        <Link to="/squarecircle">Square & Circle</Link>

        <Link to="/tableData">Table Data</Link>

        <Link to="/tictactoe">Tic Tac Toe</Link>
      </div>
    </div>
  );
}
