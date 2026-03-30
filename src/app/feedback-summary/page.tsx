'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../admin-dashboard/AdminNavbar'; // adjust the path if needed

interface Feedback {
  title: string;
  description: string;
  category: string;
  ai_summary: string;
}

export default function FeedbackSummary() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/feedback/list/summary');
      setFeedbacks(res.data.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading feedback...</p>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminNavbar />
        <div className="flex justify-center items-center flex-grow">
          <p className="text-lg font-medium">No feedback found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navbar */}
      <AdminNavbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Feedback Summary</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((fb, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{fb.title}</h2>
              <p className="text-gray-700 mb-2">{fb.description}</p>
              <p className="text-sm text-blue-600 mb-2">Category: {fb.category}</p>
              <div className="bg-gray-50 p-3 rounded border">
                <strong>AI Summary:</strong>
                <p className="text-gray-700">{fb.ai_summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}