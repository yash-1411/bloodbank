import { useState } from "react";

export default function FindDonors() {

  const [blood_group, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState("");

  async function handleFind() {

    if (!blood_group) {
      setMessage("Please enter a blood group.");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/get_donor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          blood_group: blood_group
        })
      });

      const data = await res.json();

      if (data.length === 0) {
        setMessage("No donors found.");
        setDonors([]);
      } else {
        setDonors(data);
        setMessage("");
      }

    } catch (error) {
      console.log(error);
      setMessage("Something went wrong.");
    }
  }

  return (

    <div style={{ padding: "20px" }}>

      <h2>Find Donors</h2>

      <input
        type="text"
        placeholder="Enter Blood Group"
        value={blood_group}
        onChange={(e) => setBloodGroup(e.target.value)}
      />

      <button
        style={{ marginLeft: "10px" }}
        onClick={handleFind}
      >
        Search
      </button>

      <p style={{ color: "green" }}>{message}</p>

      {donors.length > 0 && (

        <table
          border="1"
          cellPadding="10"
          style={{
            marginTop: "20px",
            borderCollapse: "collapse",
            width: "100%"
          }}
        >

          <thead>
            <tr>
              <th>Name</th>
              <th>USN</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Contact</th>
            </tr>
          </thead>

          <tbody>

            {donors.map((donor, index) => (

              <tr key={index}>

                <td>{donor[0]}</td>
                <td>{donor[1]}</td>
                <td>{donor[4]}</td>
                <td>{donor[5]}</td>
                <td>{donor[6]}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}
