import React, { useEffect, useState } from "react";
import Contact from "../components/Contact";
import { Link } from "react-router-dom";
import axios from "axios";

function Mini() {
  const [contacts, setContacts] = useState([]);

  //  VERIFYING IF THE USER HAS ALREADY SOME CONTACTS
  useEffect(() => {
    //  SENDING THE TOKEN TO VERIFY THE USER_ID
    try {
      axios.get("http://localhost:3000/").then((res) => {
        if (!res.data.one) {
          setContacts(null);
        } else {
          setContacts(res.data.result);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="all_contacts">
      {!contacts ? (
        // IF THE USER HAVE'NT REGISTRED A CONTACT YET
        <div className="no">
          <h1>No Contacts yet</h1>
          <Link to={"/add"}>Add a contact</Link>
        </div>
      ) : (
        <>
          {
            // IF THERE ARE CONTACTS REGISTRED
            contacts.map((contact) => {
              return <Contact key={contact["contact_id"]} contact={contact} />;
            })
          }
        </>
      )}
    </div>
  );
}

export default Mini;
