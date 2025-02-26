import { useState } from "react";
import "./App.css";
import Parallax from "./Parallax";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Parallax></Parallax>
    </>
  );
}

export default App;
