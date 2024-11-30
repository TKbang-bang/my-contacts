import React, { useEffect, useState } from "react";
import Contact from "../components/Contact";
import { Link } from "react-router-dom";

function Mini() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((ms) => ms.json())
      .then((res) => {
        if (!res.one) {
          setContacts(null);
        } else {
          setContacts(res.data);
        }
      });
  }, []);

  return (
    <div className="all_contacts">
      {!contacts ? (
        <div className="no">
          <h1>No Contacts yet</h1>
          <Link to={"/add"}>Add a contact</Link>
        </div>
      ) : (
        <>
          {contacts.map((contact) => {
            return <Contact key={contact["contact_id"]} contact={contact} />;
          })}
        </>
      )}
    </div>
  );
}

export default Mini;
