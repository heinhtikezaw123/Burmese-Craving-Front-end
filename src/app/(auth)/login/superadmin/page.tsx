'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login, setAdmin, setToken, setVendor } from '@/store/slices/authSlice';

export default function SuperadminLogin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Simulate login API call for Superadmin
      const fakeResponse = {
        token: 'superadminToken456',
        user: {
          id: 999,
          name: 'Superadmin',
          email,
          role: "superAdmin",
        },
        isVendor: false, // optional, superadmin might not be a vendor
        isAdmin: true,
      };

      dispatch(login(fakeResponse.user));
      dispatch(setToken(fakeResponse.token));
      dispatch(setVendor(fakeResponse.isVendor));
      dispatch(setAdmin(fakeResponse.isAdmin));


      // Redirect to superadmin dashboard
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Super Admin Login</h2>
        <p className="text-gray-600 text-center mb-6">Access your ordering system control panel</p>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
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

        {/* Optional: remove sign-up link if not applicable */}
        <div className="text-sm text-gray-500 text-center mt-4">
          Need access? Contact the system administrator.
        </div>
      </div>
    </div>
  );
}
