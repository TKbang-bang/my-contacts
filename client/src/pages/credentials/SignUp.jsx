import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
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
    axios
      .post("http://localhost:3000/signup", { name, email, password })
      .then((res) => {
        if (res.data.log) {
          navigate("/");
        } else {
          return;
        }
      });
  };

  return (
    <div className="register">
      <h1>Sign up</h1>
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
        <button type="submit">Sign up</button>
      </form>
      <p>
        Do you already have an account? <Link to={"/signin"}>Sign in</Link>
      </p>
    </div>
  );
}

export default SignUp;
