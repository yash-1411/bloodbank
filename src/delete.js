import { useState } from "react";

export default function DeleteProfile() {

  const [usn, setUsn] = useState("");
  const [message, setMessage] = useState("");

  async function handleDelete() {

    if (!usn) {

      setMessage("Please enter USN.");

      return;

    }

    try {

      const res = await fetch("http://localhost:5000/delete_profile", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          usn: usn
        })

      });

      const data = await res.json();

      setMessage(data.message);

      setUsn("");

    }

    catch (error) {

      console.log(error);

      setMessage("Failed to delete profile.");

    }

  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>Delete Profile</h1>

      <input
        type="text"
        placeholder="Enter USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
      />

      <br /><br />

      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Delete
      </button>

      <p style={{ color: "green" }}>{message}</p>

    </div>

  );

}
