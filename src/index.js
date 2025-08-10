
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Blood Bank Portal</h1>
      <p>If you are new, please <Link href="/register">Register</Link></p>
      <p>If you already have an account, please <Link href="/login">Login</Link></p>
    </div>
  );
}
