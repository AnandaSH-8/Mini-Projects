import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainApp from "./pages/index";
import CheckParity from "./pages/CheckParity";
import AddItemsToList from "./pages/AddToList";
import SquareCircle from "./pages/squareCircle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/checkparity" element={<CheckParity />} />
        <Route path="/addtolist" element={<AddItemsToList />} />
        <Route path="/squarecircle" element={<SquareCircle />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
