'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.username, formData.password);
      router.push('/rewards');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="py-5 text-center">
        <h1 className="fw-bold">Login to Your Account</h1>
        <p>Access your profile and rewards easily!</p>
      </header>

      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Email or Username"
            className="form-control mb-3"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="btn btn-coffee w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-3 text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: '#d1a679', fontWeight: 500 }}>
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

