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

export default function FeedbackFilter() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

  // Fetch all feedbacks once
  const fetchFeedbacks = async () => {
    if (!token) {
      router.push('/admin-login');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4000/api/feedback/list?page=1&limit=1000`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data.data);
      setFilteredFeedbacks(res.data.data);
    } catch (err) {
      console.error(err);
      router.push('/admin-login');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Filter locally
  const applyFilters = () => {
    let temp = [...feedbacks];
    if (filterCategory) temp = temp.filter((fb) => fb.category === filterCategory);
    if (filterStatus) temp = temp.filter((fb) => fb.status === filterStatus);
    setFilteredFeedbacks(temp);
  };

  const resetFilters = () => {
    setFilterCategory('');
    setFilterStatus('');
    setFilteredFeedbacks(feedbacks);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Link back to Admin Dashboard */}
      <div className="mb-4">
        <a href="/admin-dashboard" className="text-blue-500 hover:underline">
  ← Back to Admin Dashboard
</a>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Filter Feedback</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Bug">Bug</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Improvement">Improvement</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>

        <button
          onClick={resetFilters}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Reset Filters
        </button>
      </div>

      {/* Feedback Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Status</th>
              <th className="p-2">Description</th>
              <th className="p-2">AI Category</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Sentiment</th>
              <th className="p-2">AI Summary</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((fb) => (
              <tr key={fb._id} className="border-t">
                <td className="p-2">{fb.title}</td>
                <td className="p-2">{fb.category}</td>
                <td className="p-2">{fb.status}</td>
                <td className="p-2">{fb.description}</td>
                <td className="p-2">{fb.ai_category || '-'}</td>
                <td className="p-2">{fb.ai_priority ?? '-'}</td>
                <td className="p-2">{fb.ai_sentiment || '-'}</td>
                <td className="p-2">{fb.ai_summary || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

       
      </div>
    </div>
    
  );
}