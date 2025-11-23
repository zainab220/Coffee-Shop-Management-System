'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check password match in real-time
    if (name === 'password' || name === 'confirmPassword') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      if (name === 'confirmPassword' && confirmPassword) {
        setPasswordMatch(password === confirmPassword);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      // Combine first and last name for backend
      const fullName = `${formData.firstname} ${formData.lastname}`;
      await register({
        name: fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address || undefined,
      });
      router.push('/rewards');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="py-5 text-center">
        <h1 className="fw-bold">Create an Account</h1>
        <p>Join MochaMagic and start earning rewards ☕</p>
      </header>

      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <form className="login-form" onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First Name"
                className="form-control"
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                className="form-control"
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            className="form-control mb-3"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password (min 6 characters)"
            className="form-control mb-3"
            minLength={6}
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control mb-2"
              minLength={6}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              style={{
                borderColor: passwordMatch === null ? '#cbb09c' : passwordMatch ? '#28a745' : '#dc3545',
              }}
            />
            {formData.confirmPassword && (
              <div
                style={{
                  marginTop: '-10px',
                  marginBottom: '15px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: passwordMatch ? '#28a745' : '#dc3545',
                }}
              >
                {passwordMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}
          </div>

          <textarea
            id="address"
            name="address"
            placeholder="Delivery Address (Optional)"
            className="form-control mb-3"
            rows={2}
            value={formData.address}
            onChange={handleInputChange}
          />

          <button type="submit" className="btn btn-coffee w-100" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <p className="mt-3 text-center">
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#d1a679', fontWeight: 500 }}>
              Login
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

