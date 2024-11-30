import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function View() {
  const [data, setData] = useState({});
  const contactId = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/view/${contactId.id}`)
      .then((res) => res.json())
      .then((ms) => {
        setData(ms.data[0]);
      });
  }, []);

  return (
    <div className="view">
      <button onClick={() => history.back()}>{"<<< Back"}</button>
      <div className="ctn">
        <div>
          <p>Name</p>
          {data["contact_name"] ? (
            <h3>{data["contact_name"]}</h3>
          ) : (
            <h3 className="nothing">No name...</h3>
          )}
        </div>
        <div>
          <p>Lastname</p>
          {data["contact_lastname"] ? (
            <h3>{data["contact_lastname"]}</h3>
          ) : (
            <h3 className="nothing">No lastname...</h3>
          )}
        </div>
        <div>
          <p>Email</p>
          {data["contact_email"] ? (
            <h3>{data["contact_email"]}</h3>
          ) : (
            <h3 className="nothing">No email...</h3>
          )}
        </div>
        <div>
          <p>Number</p>
          {data["contact_number"] ? (
            <h3>{data["contact_number"]}</h3>
          ) : (
            <h3 className="nothing">No number...</h3>
          )}
        </div>
        <div>
          <p>Description</p>
          {data["contact_description"] ? (
            <h4>{data["contact_description"]}</h4>
          ) : (
            <h3 className="nothing">No description...</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
