
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({ name: '', usn: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',  // Change to POST (your Flask login was GET with JSON body, which is not standard)
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok && data.message === 'login successful') {
      // Save usn to sessionStorage/localStorage for demo, better to use auth in real apps
      sessionStorage.setItem('usn', form.usn);
      router.push('/profile');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="usn" placeholder="USN" onChange={handleChange} />
      <button onClick={handleSubmit}>Login</button>
      <p>{message}</p>
    </div>
  );
}
