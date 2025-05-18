'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function VendorLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Vendor Login</h2>
        <p className="text-gray-600 text-center mb-6">Access your dashboard and manage your restaurant</p>

        <div className="space-y-4">
          <Input label="Email" type="email" placeholder="vendor@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
        </div>

        <div className="mt-6">
          <Button label="Login" className="w-full" />
        </div>

        <div className="text-sm text-gray-500 text-center mt-4">
          New to Burmese Craving?{' '}
          <a href="/register/vendor" className="text-primary hover:underline">
            Join as a Vendor
          </a>
        </div>
      </div>
    </div>
  );
}
