import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Contact({ contact }) {
  const handleDel = () => {
    try {
      axios
        .delete(`http://localhost:3000/del/${contact["contact_id"]}`)
        .then((res) => {
          if (res.data.ok) window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contact">
      {contact["contact_name"] ? (
        <p>{contact["contact_name"]}</p>
      ) : (
        <p className="nothing">NULL...</p>
      )}
      {contact["contact_lastname"] ? (
        <p>{contact["contact_lastname"]}</p>
      ) : (
        <p className="nothing">NULL...</p>
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
