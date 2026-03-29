'use client';

import AdminLoginPage from '../admin-login/page';
import FeedbackForm from '../../components/FeedbackForm';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      
      {/* Main Heading */}
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Feedback Analysis Application
      </h1>

      {/* Forms side by side */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        
        {/* Feedback Form */}
        <div className="flex-1 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Submit Feedback</h2>
          <FeedbackForm />
        </div>

        {/* Admin Login Form */}
        <div className="flex-1 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <AdminLoginPage />
        </div>

      </div>
    </div>
  );
}