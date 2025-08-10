
'use client';

import { useState } from 'react';

export default function FindDonors() {
  const [blood_group, setBloodGroup] = useState('');
  const [donors, setDonors] = useState([]);

  const handleFind = async () => {
    const res = await fetch('http://localhost:5000/get_donor', {
      method: 'POST', // Again, using POST instead of invalid GET with body
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blood_group }),
    });
    const data = await res.json();
    setDonors(data);
  };

  return (
    <div className="container">
      <h2>Find Donors</h2>
      <input placeholder="Blood Group" onChange={(e) => setBloodGroup(e.target.value)} />
      <button onClick={handleFind}>Get Donors</button>
      <ul>
        {donors.map((donor, index) => (
          <li key={index}>{donor[0]} - {donor[1]} - {donor[5]}</li>
        ))}
      </ul>
    </div>
  );
}
