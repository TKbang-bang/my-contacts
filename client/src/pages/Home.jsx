import React from "react";
import { Routes, Route } from "react-router-dom";
import Mini from "./Mini.jsx";
import Nav from "../components/Nav.jsx";
import Add from "./Add.jsx";

function Home() {
  return (
    <div className="home">
      <Nav />
      <Routes>
        <Route path="/" element={<Mini />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
}

export default Home;
