'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login, setToken, setVendor } from '@/store/slices/authSlice';

export default function CustomerLogin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Simulate login API call
      const fakeResponse = {
        token: 'exampleToken123',
        user: {
          id: 1,
          name: 'Example User',
          email,
        },
        isVendor: true,
      };

      // Dispatch to Redux store
      dispatch(login(fakeResponse.user));
      dispatch(setToken(fakeResponse.token));
      dispatch(setVendor(fakeResponse.isVendor));

      // Navigate to the restaurant creation page
      router.push('/restaurant/new?lng=96.1676269&lat=16.7728331&vertical=restaurants');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Log in to order delicious Burmese food</p>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className="mt-6">
          <Button label="Login" className="w-full" onClick={handleLogin} />
        </div>

        <div className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{' '}
          <a href="/register/customer" className="text-primary hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
