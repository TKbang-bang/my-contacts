import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const contactId = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .patch(import.meta.env.VITE_BACKEND_URL + "edit", {
          ctcID: contactId.id,
          name,
          lastname,
          email,
          number,
          description,
        })
        .then((res) => {
          res.data.ok ? navigate("/") : console.log("Try again");
        });
    } catch (error) {
      console.log(error);
    }
  };

  //   TAKING THE FIELDS INFORMATIONS FROM SERVER
  useEffect(() => {
    try {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + `view/${contactId.id}`)
        .then((ms) => {
          setName(ms.data.result[0]["contact_name"]);
          setLastname(ms.data.result[0]["contact_lastname"]);
          setEmail(ms.data.result[0]["contact_email"]);
          setNumber(ms.data.result[0]["contact_number"]);
          setDescription(ms.data.result[0]["contact_description"]);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="edit">
      <button onClick={() => history.back()}>{"<<< Back"}</button>
      <form onSubmit={handleSubmit}>
        <div className="name">
          <input
            type="text"
            placeholder="Nmae"
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
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default Edit;
