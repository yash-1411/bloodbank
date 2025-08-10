
'use client';

import { useState } from 'react';

export default function UpdateProfile() {
  const [form, setForm] = useState({
    role: '',
    dob: '',
    gender: '',
    blood_group: '',
    location: '',
    contact: '',
    usn: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch('http://localhost:5000/profile_update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <input name="role" placeholder="Role" onChange={handleChange} />
      <input name="dob" placeholder="DOB" onChange={handleChange} />
      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <input name="blood_group" placeholder="Blood Group" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="contact" placeholder="Contact" onChange={handleChange} />
      <input name="usn" placeholder="USN" onChange={handleChange} />
      <button onClick={handleUpdate}>Update</button>
      <p className="message">{message}</p>
    </div>
  );
}
