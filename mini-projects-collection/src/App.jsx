import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainApp from "./pages/index";
import CheckParity from "./pages/CheckParity";
import AddItemsToList from "./pages/AddToList";
import SquareCircle from "./pages/squareCircle";
import TableData from "./pages/TableData";
import TicTacToe from "./pages/TicTacToe";
import SudokuValidator from "./pages/SudokuValidator";
import SnakeAndLadders from "./pages/SnakeAndLadders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/checkparity" element={<CheckParity />} />
        <Route path="/addtolist" element={<AddItemsToList />} />
        <Route path="/squarecircle" element={<SquareCircle />} />
        <Route path="/tableData" element={<TableData />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/sudokuvalidator" element={<SudokuValidator />} />
        <Route path="/snakeandladders" element={<SnakeAndLadders />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
