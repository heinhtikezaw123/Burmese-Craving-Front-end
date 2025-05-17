// components/customer/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-8">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Burmese Craving. All rights reserved.
      </p>
    </footer>
  );
}
