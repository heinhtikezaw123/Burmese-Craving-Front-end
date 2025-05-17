"use client";

import { RootState } from '@/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const router = useRouter();

  const { isAuthenticated, isVendor } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      if (isVendor) {
        router.replace('/dashboard'); // restaurant
      } else {
        router.replace('/restaurant/new?lng=96.1676269&lat=16.7728331&vertical=restaurants'); // customer
      }
    }
  }, [isAuthenticated, isVendor]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Burmese Craving</h1>
      <p className="text-lg mb-8">Order delicious food or manage your restaurant from one place.</p>

      <div className="space-y-4">
        <Link href="/login/customer">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Login
          </button>
        </Link>
        <Link href="/register/customer">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ml-4">
            Register
          </button>
        </Link>
        <div className="mt-6">
          <Link href="/register/vendor">
            <span className="text-sm underline text-gray-600 hover:text-gray-800">
              Are you a restaurant? Create your account
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
