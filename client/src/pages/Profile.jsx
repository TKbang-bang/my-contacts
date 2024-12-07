import axios from "axios";
import React from "react";

function Profile() {
  const handleOut = () => {
    axios.delete("http://localhost:3000/logout").then((res) => {
      if (res.data.out) {
        window.location.reload();
      } else {
        console.log(res.data.message);
      }
    });
  };

  return (
    <div>
      <h3>Profile with photo coming soon</h3>
      <button onClick={handleOut}>Log out</button>
    </div>
  );
}

export default Profile;
