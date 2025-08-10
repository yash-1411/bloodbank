
'use client';

import { useState } from 'react';

export default function DeleteProfile() {
  const [usn, setUsn] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const res = await fetch('http://localhost:5000/delete_profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usn }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="container">
      <h2>Delete Profile</h2>
      <input placeholder="USN" onChange={(e) => setUsn(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
      <p className="message">{message}</p>
    </div>
  );
}
