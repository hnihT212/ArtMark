import "./App.css";
import navbar from "./components/navbar";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <>
      <Router>
        <navbar />
        <Routes>
          <Route path="/" exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
