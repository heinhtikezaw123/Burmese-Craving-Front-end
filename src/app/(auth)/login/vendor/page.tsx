'use client';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RestaurantLogin() {
    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Restaurant Login</h2>
            <Input label="Email" type="email" placeholder="restaurant@example.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Button label="Login" />
        </div>
    );
}