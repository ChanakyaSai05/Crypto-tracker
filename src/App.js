import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
