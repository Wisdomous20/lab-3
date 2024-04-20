import { useState } from "react";
import Login from "../src/components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
