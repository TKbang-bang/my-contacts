import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View.jsx";
import Edit from "./pages/Edit.jsx";
import axios from "axios";
import SignUp from "./pages/credentials/SignUp.jsx";
import SignIn from "./pages/credentials/SignIn.jsx";

function App() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  //  CHECKING IF THE USER IS LOG
  useEffect(() => {
    try {
      axios.get(import.meta.env.VITE_BACKEND_URL + "verify").then((res) => {
        if (!res.data.log) {
          if (window.location != "http://localhost:5173/signup")
            navigate("/signin");
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="container">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
