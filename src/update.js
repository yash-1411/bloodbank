import { useState } from "react";

export default function UpdateProfile() {

  const [form, setForm] = useState({
    usn: "",
    role: "",
    dob: "",
    gender: "",
    blood_group: "",
    location: "",
    contact: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  async function handleUpdate() {

    if (!form.usn) {

      setMessage("Please enter USN.");

      return;

    }

    try {

      const res = await fetch("http://localhost:5000/profile_update", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)

      });

      const data = await res.json();

      setMessage(data.message);

    }

    catch (error) {

      console.log(error);

      setMessage("Failed to update profile.");

    }

  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>Update Profile</h1>

      <input
        name="usn"
        placeholder="USN"
        value={form.usn}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="gender"
        placeholder="Gender"
        value={form.gender}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="blood_group"
        placeholder="Blood Group"
        value={form.blood_group}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="contact"
        placeholder="Mobile Number"
        value={form.contact}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleUpdate}>
        Update
      </button>

      <p style={{ color: "green" }}>{message}</p>

    </div>

  );

}
