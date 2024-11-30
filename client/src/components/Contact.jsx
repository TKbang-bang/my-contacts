import React from "react";
import { Link } from "react-router-dom";

function Contact({ contact }) {
  const handleDel = () => {
    fetch(`http://localhost:3000/del/${contact["contact_id"]}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((ms) => ms.json())
      .then((res) => {
        if (res) window.location.reload();
      });
  };

  return (
    <div className="contact">
      {contact["contact_name"] ? (
        <p>{contact["contact_name"]}</p>
      ) : (
        <p className="nothing">Empty...</p>
      )}
      {contact["contact_lastname"] ? (
        <p>{contact["contact_lastname"]}</p>
      ) : (
        <p className="nothing">Empty...</p>
      )}
      <div className="btns">
        <Link to={`/view/${contact["contact_id"]}`}>View</Link>
        <Link to={`/edit/${contact["contact_id"]}`}>Edit</Link>
        <button onClick={handleDel}>Delete</button>
      </div>
    </div>
  );
}

export default Contact;
