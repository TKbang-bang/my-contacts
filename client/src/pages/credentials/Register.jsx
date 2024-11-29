import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [see, setSee] = useState(false);
  const [name, setName] = useState("");
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
    fetch("http://localhost:3000/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, email, password }),
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
      <p>
        Do you already have an account? <Link to={"/login"}>Log in</Link>
      </p>
    </div>
  );
}

export default Register;
