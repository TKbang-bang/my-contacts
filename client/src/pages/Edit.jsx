import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [data, setData] = useState({});
  const [name, setName] = useState(data["contact_name"]);
  const [lastname, setLastname] = useState(data["contact_lastname"]);
  const [email, setEmail] = useState(data["contact_email"]);
  const [number, setNumber] = useState(data["contact_number"]);
  const [description, setDescription] = useState(data["contact_description"]);
  const navigate = useNavigate();

  const contactId = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/edit`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ctcID: contactId.id,
        name,
        lastname,
        email,
        number,
        description,
      }),
    })
      .then((ms) => ms.json())
      .then((res) => {
        res.ok ? navigate("/") : console.log("Try again");
        // console.log(res);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/view/${contactId.id}`)
      .then((res) => res.json())
      .then((ms) => {
        setName(ms.data[0]["contact_name"]);
        setLastname(ms.data[0]["contact_lastname"]);
        setEmail(ms.data[0]["contact_email"]);
        setNumber(ms.data[0]["contact_number"]);
        setDescription(ms.data[0]["contact_description"]);
        // setData(ms.data[0]);
      });
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
