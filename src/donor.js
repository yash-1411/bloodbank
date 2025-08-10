
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DonorDetails() {
  const router = useRouter();
  const { name } = router.query;
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!name) return;

    async function fetchDonor() {
      setLoading(true);
      try {
        const res = await fetch('/api/get_donordetails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });

        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data = await res.json();
        setDonor(data);
      } catch (err) {
        console.error('Failed fetching donor details:', err);
        setError('Failed to fetch donor details.');
      } finally {
        setLoading(false);
      }
    }

    fetchDonor();
  }, [name]);

  if (loading) return <p>Loading donor details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!donor) return <p>No donor found.</p>;

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '1.5rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
    }}>
      <h2 style={{ marginBottom: '1rem' }}>{donor[0]}</h2>
      <p><strong>USN:</strong> {donor[1]}</p>
      <p><strong>Contact:</strong> {donor[5]}</p>
      {/* Render additional donor fields below as needed */}
    </div>
  );
}
