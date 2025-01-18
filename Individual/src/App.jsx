import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Graph from "./Components/Pages/Graph";
import Navbar from "./Components/Common/Navbar";
import About from "./Components/Pages/About";
import Home from "./Components/Pages/Home";
import NotFound from "./Components/Pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Graph" element={<Graph />} />
        <Route path="/About" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
