'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { getTotalCount } = useCart();
  const { user, logout } = useAuth();
  const cartCount = getTotalCount();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">
          <span style={{ color: '#d1a679' }}>Mocha</span>Magic
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/menu') ? 'active' : ''}`}
                href="/menu"
              >
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
                href="/cart"
              >
                Cart{' '}
                {cartCount > 0 && (
                  <span className="badge bg-danger">{cartCount}</span>
                )}
              </Link>
            </li>
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {user.name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/rewards">
                      My Rewards
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                  href="/login"
                >
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/rewards') ? 'active' : ''}`}
                href="/rewards"
              >
                Rewards
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/reviews') ? 'active' : ''}`}
                href="/reviews"
              >
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                href="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

