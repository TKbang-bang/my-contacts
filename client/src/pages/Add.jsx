import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "add", {
          name,
          lastname,
          email,
          number,
          description,
        })
        .then((res) => {
          if (!res.data.ok) {
            console.log(res.data);
          } else {
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
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
