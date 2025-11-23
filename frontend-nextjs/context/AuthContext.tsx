'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
  customer_id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  reward_points?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session and validate token
    const loadUser = async () => {
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (savedUser && token) {
          try {
            setUser(JSON.parse(savedUser));
            // Optionally validate token by fetching profile
            try {
              const profile = await authAPI.getProfile();
              setUser(profile);
              localStorage.setItem('user', JSON.stringify(profile));
            } catch (e) {
              // Token might be expired, clear it
              console.error('Token validation failed:', e);
              authAPI.logout();
            }
          } catch (e) {
            console.error('Error loading user:', e);
            authAPI.logout();
          }
        }
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      setUser(response.user);
      router.push('/rewards');
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => {
    try {
      await authAPI.register(data);
      // After registration, automatically log in
      await login(data.email, data.password);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    // Clear cart from localStorage
    localStorage.removeItem('mochamagic_cart');
    // Trigger custom event so CartContext can react immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cartCleared'));
    }
    router.push('/');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

