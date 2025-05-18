"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import '@/styles/globals.css';
import heroImage from "@/assets/images/chef-icon-vector.png"

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, isVendor } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      if (isVendor) {
        router.replace('/dashboard');
      } else {
        router.replace('/restaurant/new?lng=96.1676269&lat=16.7728331&vertical=restaurants');
      }
    }
  }, [isAuthenticated, isVendor]);

  return (
    <main className="text-gray-800">
      {/* Hero Section - Customer */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <Image
          src={heroImage}
          alt="Delicious Burmese Dishes"
          className="w-[200px] h-auto rounded-lg"
        />
        <h1 className="text-5xl font-bold mb-4 text-primary">Crave Burmese Food?</h1>
        <p className="text-xl mb-6 max-w-xl mx-auto md:mx-0">
          Discover top-rated Burmese restaurants near you and get your favorite traditional meals delivered fast.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <Link href="/login/customer">
            <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">Order Now</button>
          </Link>
          <Link href="/register/customer">
            <button className="bg-white text-primary border border-primary px-6 py-2 rounded hover:bg-primary/10">
              Register
            </button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            ['Browse Restaurants', 'Discover nearby Burmese restaurants'],
            ['Place Your Order', 'Choose your meal and pay online'],
            ['Enjoy Delivery', 'Get hot, fresh food delivered fast'],
          ].map(([title, desc], i) => (
            <div key={i} className="p-6 border rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vendor Invitation */}
      <section className="py-20 px-4 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Are You a Restaurant Owner?</h2>
        <p className="text-lg mb-6">Join Burmese Craving and reach thousands of hungry customers every day.</p>
        <Link href="/register/vendor">
          <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">Join as a Vendor</button>
        </Link>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">What People Are Saying</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            ['“Amazing variety and fast delivery!”', '– Aye Chan'],
            ['“As a vendor, my orders doubled in a week.”', '– Ko Min (Vendor)'],
          ].map(([quote, name], i) => (
            <div key={i} className="bg-yellow-50 p-6 rounded shadow">
              <p className="italic mb-2">"{quote}"</p>
              <p className="text-sm text-gray-600">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 px-4 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Burmese Craving was founded to help Burmese communities in the U.S. enjoy authentic dishes from home by connecting them with local Burmese restaurants        </p>
      </section>

      {/* Final Call to Action */}
      <footer className="py-16 px-4 bg-primary text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <div className="flex justify-center gap-4">
          <Link href="/login/customer">
            <button className="bg-white text-primary px-6 py-2 rounded hover:bg-gray-100">Order Now</button>
          </Link>
          <Link href="/register/vendor">
            <button className="bg-white text-primary px-6 py-2 rounded hover:bg-gray-100">Become a Vendor</button>
          </Link>
        </div>
      </footer>
    </main>
  );
}
