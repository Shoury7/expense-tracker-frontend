import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
        <Body />
      </div>
    </>
  );
}

export default App;
