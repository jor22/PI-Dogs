import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home"
import Details from "./components/Details"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Landing/>}/>
          <Route path={'/dog'} element={<Home/>}/>
          <Route path={"/dog/:id"} element={<Details/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
