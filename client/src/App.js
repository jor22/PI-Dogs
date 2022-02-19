import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Landing/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
