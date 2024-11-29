import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/verify", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((ms) => ms.json())
      .then((res) => {
        if (!res.log) {
          navigate("/login");
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/add", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        name,
        lastname,
        email,
        number,
        description: description.toString(),
      }),
    })
      .then((ms) => ms.json())
      .then((res) => {
        if (!res.ok) {
          console.log(res.message);
        } else {
          navigate("/");
        }
      });
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit}>
        <div className="name">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="contacts">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <textarea
          className="desc"
          placeholder="Description..."
          maxLength={250}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
}

export default Add;
