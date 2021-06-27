import React, { useState } from "react";
import "./App.css";
import { questions } from "./components/data";
import { HomePage } from "./components/HomePage";

function App() {
  return (
    <>
      <div className="app">
        <HomePage />
      </div>
    </>
  );
}

export default App;
