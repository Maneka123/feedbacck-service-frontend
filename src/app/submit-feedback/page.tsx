'use client';

import FeedbackForm from '../../components/FeedbackForm';
import Link from 'next/link';
import AdminNavbar from '../admin-dashboard/AdminNavbar';

export default function SubmitFeedbackPage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Admin Navbar */}
        <AdminNavbar />

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-white bg-opacity-90 p-8 rounded shadow-md backdrop-blur-sm">
            <FeedbackForm />
            <p className="mt-4 text-center">
              <Link href="/admin-login" className="text-blue-500 hover:underline">
                Admin Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}