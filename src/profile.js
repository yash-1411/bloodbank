'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Profile() {
  const [form, setForm] = useState({
    usn: '',
    role: '',
    dob: '',
    gender: '',
    blood_group: '',
    location: '',
    contact: '',
  });

  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);

  const API = 'http://localhost:5000';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    const res = await fetch(`${API}/profile_update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    setMessage(result.message || 'Updated successfully');
  };

  const deleteProfile = async () => {
    const res = await fetch(`${API}/delete_profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usn: form.usn }),
    });
    const result = await res.json();
    setMessage(result.message || 'Deleted successfully');
    setForm({
      usn: '',
      role: '',
      dob: '',
      gender: '',
      blood_group: '',
      location: '',
      contact: '',
    });
    setDonors([]);
  };

async function getDonors() {
  const url = `${API}/get_donor`;

  if (!form.blood_group) {
    setMessage('Please enter a blood group to find donors.');
    return;
  }

  try {
    console.log("🔍 Fetching donors for blood group:", form.blood_group);

    // Use POST instead of GET, since we are sending a body
    const response = await fetch(url, {
      method: 'POST', // ✅ Changed from GET to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blood_group: form.blood_group }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log("🧾 API Response:", result);

    if (Array.isArray(result)) {
      setDonors(result);
      setMessage('');
    } else {
      setMessage(result.message || 'No donors found.');
    }

  } catch (error) {
    console.error('❌ Error fetching donors:', error.message);
    setMessage('Failed to fetch donors. Please try again.');
  }
}


  return (
    <div style={{ padding: 20 }}>
      <h1>Profile Page</h1>

      <input
        name="usn"
        placeholder="Enter USN to manage your profile"
        value={form.usn}
        onChange={handleChange}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setShowUpdate(!showUpdate)}>
          {showUpdate ? 'Hide Update Section' : 'Show Update Section'}
        </button>
        <button style={{ marginLeft: '10px', backgroundColor: 'crimson' }} onClick={deleteProfile}>
          Delete Profile
        </button>
      </div>

      {showUpdate && (
        <div style={{ marginTop: 20 }}>
          <h2>Update Your Details</h2>
          <input name="role" placeholder="Role (donor/null)" onChange={handleChange} />
          <input name="dob" placeholder="Date of Birth" onChange={handleChange} />
          <input name="gender" placeholder="Gender" onChange={handleChange} />
          <input name="blood_group" placeholder="Blood Group" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />
          <input name="contact" placeholder="Contact Number" onChange={handleChange} />
          <button onClick={updateProfile}>Update Profile</button>
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h2>Find Donors</h2>
      <input
        name="blood_group"
        placeholder="Enter blood group"
        onChange={handleChange}
        value={form.blood_group}
      />
      <button onClick={getDonors}>Find Donors</button>

{donors.length > 0 && (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
    {donors.map((donor, index) => (
      <div
        key={index}
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          width: '250px',
          boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h3>{donor[0]}</h3> {/* name */}
        <p>
          <strong>Name:</strong>{' '}
          <Link href={"/donar/${encodeURIComponent(donor[1])"}>
            {donor[1]}
          </Link>
        </p>
        <p>
          <strong>Blood group:</strong> {donor[5]}
        </p>
      </div>
    ))}
  </div>
)}


      <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>
    </div>
  );
}