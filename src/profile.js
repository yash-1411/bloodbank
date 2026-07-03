import { useState } from "react";
import Link from "next/link";

export default function Profile() {

  const API = "http://localhost:5000";

  const [form, setForm] = useState({
    usn: "",
    role: "",
    dob: "",
    gender: "",
    blood_group: "",
    location: "",
    contact: ""
  });

  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Update Profile
  async function updateProfile() {

    const res = await fetch(`${API}/profile_update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    setMessage(data.message);
  }

  // Delete Profile
  async function deleteProfile() {

    const res = await fetch(`${API}/delete_profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usn: form.usn
      })
    });

    const data = await res.json();

    setMessage(data.message);

    setDonors([]);

    setForm({
      usn: "",
      role: "",
      dob: "",
      gender: "",
      blood_group: "",
      location: "",
      contact: ""
    });
  }

  // Find Donors
  async function getDonors() {

    if (!form.blood_group) {
      setMessage("Enter Blood Group");
      return;
    }

    const res = await fetch(`${API}/get_donor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        blood_group: form.blood_group
      })
    });

    const data = await res.json();

    setDonors(data);

    if (data.length === 0) {
      setMessage("No Donors Found");
    } else {
      setMessage("");
    }
  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>Blood Donation Portal</h1>

      <input
        name="usn"
        placeholder="Enter USN"
        value={form.usn}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={() => setShowUpdate(!showUpdate)}>
        {showUpdate ? "Hide Update" : "Update Profile"}
      </button>

      <button
        style={{
          marginLeft: "15px",
          background: "red",
          color: "white"
        }}
        onClick={deleteProfile}
      >
        Delete Profile
      </button>

      {showUpdate && (

        <div style={{ marginTop: 30 }}>

          <h2>Update Details</h2>

          <input
            name="role"
            placeholder="Role"
            onChange={handleChange}
          /><br /><br />

          <input
            type="date"
            name="dob"
            onChange={handleChange}
          /><br /><br />

          <input
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
          /><br /><br />

          <input
            name="blood_group"
            placeholder="Blood Group"
            onChange={handleChange}
          /><br /><br />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
          /><br /><br />

          <input
            name="contact"
            placeholder="Mobile Number"
            onChange={handleChange}
          /><br /><br />

          <button onClick={updateProfile}>
            Save
          </button>

        </div>

      )}

      <hr />

      <h2>Find Donors</h2>

      <input
        name="blood_group"
        placeholder="Blood Group"
        value={form.blood_group}
        onChange={handleChange}
      />

      <button
        style={{ marginLeft: 10 }}
        onClick={getDonors}
      >
        Search
      </button>

      <br /><br />

      {donors.length > 0 && (

        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            width: "100%"
          }}
        >

          <thead>

            <tr>

              <th>Name</th>
              <th>USN</th>
              <th>Blood Group</th>
              <th>Location</th>
              <th>Contact</th>

            </tr>

          </thead>

          <tbody>

            {donors.map((donor, index) => (

              <tr key={index}>

                <td>

                  <Link href={`/donor?name=${encodeURIComponent(donor[0])}`}>
                    {donor[0]}
                  </Link>

                </td>

                <td>{donor[1]}</td>

                <td>{donor[5]}</td>

                <td>{donor[4]}</td>

                <td>{donor[6]}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      <p
        style={{
          color: "green",
          marginTop: "20px"
        }}
      >
        {message}
      </p>

    </div>

  );

}
