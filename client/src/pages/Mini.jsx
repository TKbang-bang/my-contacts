import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Mini() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((ms) => {
        if (ms.log) {
          setUser(ms.data);
        } else {
          navigate("/login");
        }
      });
  }, []);

  return (
    <div>
      <h1>{user["user_name"]}</h1>
    </div>
  );
}

export default Mini;
