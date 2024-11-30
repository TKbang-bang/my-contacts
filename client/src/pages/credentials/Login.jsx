import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [see, setSee] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSee = () => {
    if (!see) {
      document.querySelector(".container .register form div input").type =
        "text";
      setSee(true);
    } else {
      document.querySelector(".container .register form div input").type =
        "password";
      setSee(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((ms) => ms.json())
      .then((ms2) => {
        if (ms2.log) {
          const token = `barear ${ms2.token}`;
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          return;
        }
      });
  };

  return (
    <div className="register">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="pass">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label onClick={handleSee}>{see ? "Hide" : "See"}</label>
        </div>
        <button type="submit">Log in</button>
      </form>
      <p>
        Don't you have an account yet? <Link to={"/register"}>Register</Link>
      </p>
    </div>
  );
}

export default Login;
