// feedback-frontend/src/components/AdminNavbar.tsx
'use client';

import Link from 'next/link';
import { logoutAdmin } from '../../utils/auth';

export default function AdminNavbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link href="/admin-dashboard" className="text-blue-500 hover:underline">
          View All Feedback
        </Link>
        <Link href="/admin-dashboard/feedback-filter" className="text-blue-500 hover:underline">
          Filter Feedback
        </Link>
        <Link href="/submit-feedback" className="text-blue-500 hover:underline">
          Submit Feedback
        </Link>
      </div>
      <button
        onClick={logoutAdmin}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}