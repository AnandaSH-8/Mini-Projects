import { Link } from "react-router-dom";

export default function MainApp() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "orange" }}>
        This is the Introduction Page for Mini Projects Collection
      </h1>
      <h1>Mini Projects Collection</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          justifyContent: "center",
          alignContent: "center",
          margin: "50px auto",
          border: "1px solid red",
          width: "70%",
        }}
      >
        <h3>
          {" "}
          <Link to="/checkparity">Check Parity</Link>
        </h3>
        <h3>
          {" "}
          <Link to="/checkparity">Check Parity</Link>
        </h3>

        <h3>
          {" "}
          <Link to="/checkparity">Check Parity</Link>
        </h3>
        <h3>
          {" "}
          <Link to="/checkparity">Check Parity</Link>
        </h3>
      </div>
    </div>
  );
}
