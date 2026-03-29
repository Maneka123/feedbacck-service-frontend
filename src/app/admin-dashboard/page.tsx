'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Feedback {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  ai_category?: string;
  ai_sentiment?: string;
  ai_priority?: number;
  ai_summary?: string;
}

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin-login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:4000/api/feedback/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data.data);
      } catch (err) {
        console.error(err);
        router.push('/admin-login');
      }
    };

    fetchFeedback();
  }, [router]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Status</th>
              <th className="p-2">AI Category</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <tr key={fb._id} className="border-t">
                <td className="p-2">{fb.title}</td>
                <td className="p-2">{fb.category}</td>
                <td className="p-2">{fb.status}</td>
                <td className="p-2">{fb.ai_category || '-'}</td>
                <td className="p-2">{fb.ai_priority ?? '-'}</td>
                <td className="p-2">{fb.ai_sentiment || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}