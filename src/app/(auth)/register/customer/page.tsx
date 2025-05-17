'use client';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function CustomerRegister() {
  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Customer Register</h2>
      <Input label="Name" placeholder="John Doe" />
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Button label="Register" />
    </div>
  );
}
