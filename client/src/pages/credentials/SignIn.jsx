import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [see, setSee] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //  FUNCTION TO SEE THE PASSWORD
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
      .post(import.meta.env.VITE_BACKEND_URL + "signin", { email, password })
      .then((response) => {
        if (response.data.log) {
          navigate("/");
        } else {
          return;
        }
      });
  };

  return (
    <div className="register">
      <h1>Sign in</h1>
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
        <button type="submit">Sign in</button>
      </form>
      <p>
        Don't you have an account yet? <Link to={"/signup"}>Sign up</Link>
      </p>
    </div>
  );
}

export default SignIn;
