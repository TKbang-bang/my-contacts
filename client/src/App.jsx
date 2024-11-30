import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/credentials/Register";
import Login from "./pages/credentials/Login.jsx";
import View from "./pages/View.jsx";
import Edit from "./pages/Edit.jsx";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/verify", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((ms) => ms.json())
      .then((res) => {
        if (res.log) {
          return;
        } else {
          navigate("/login");
        }
      });
  });

  return (
    <div className="container">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
