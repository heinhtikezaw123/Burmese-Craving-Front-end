'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function CustomerRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Customer Register</h2>
        <p className="text-gray-600 text-center mb-6">Create an account and start ordering your favorite Burmese dishes</p>

        <div className="space-y-4">
          <Input label="Name" type="text" placeholder="Your Full Name" />
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
        </div>

        <div className="mt-6">
          <Button label="Register" className="w-full" />
        </div>

        <div className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{' '}
          <a href="/login/customer" className="text-primary hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
