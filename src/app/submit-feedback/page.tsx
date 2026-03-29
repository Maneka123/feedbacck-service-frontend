// feedback-frontend/src/app/submit-feedback/page.tsx
'use client';

import FeedbackForm from '../../components/FeedbackForm';
import Link from 'next/link';
import AdminNavbar from '../admin-dashboard/AdminNavbar';

export default function SubmitFeedbackPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Main content */}
      <div className="p-6">
        <FeedbackForm />
        <p className="mt-4 text-center">
          <Link href="/admin-login" className="text-blue-500 hover:underline">
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
}