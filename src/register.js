
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ name: '', usn: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
      router.push('/login'); // redirect to login after successful registration
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="usn" placeholder="USN" onChange={handleChange} />
      <button onClick={handleSubmit}>Register</button>
      <p>{message}</p>
    </div>
  );
}
