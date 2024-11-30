import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Mini from "./Mini.jsx";
import Nav from "../components/Nav.jsx";
import Add from "./Add.jsx";
import Profile from "./Profile.jsx";

function Home() {
  return (
    <div className="home">
      <Nav />
      <Routes>
        <Route path="/" element={<Mini />} />
        <Route path="/add" element={<Add />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default Home;
