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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

  const fetchFeedback = async () => {
    if (!token) {
      router.push('/admin-login');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4000/api/feedback/list?page=${page}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data.data);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
      router.push('/admin-login');
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [page]);

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!token) return;
    try {
      await axios.patch(
        `http://localhost:4000/api/feedback/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFeedback(); // Refresh table
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await axios.delete(`http://localhost:4000/api/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFeedback(); // Refresh table
    } catch (err) {
      console.error(err);
      alert('Failed to delete feedback');
    }
  };

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
              <th className="p-2">Update Status</th>
              <th className="p-2">Delete</th>
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
                <td className="p-2">
                  <select
                    value={fb.status}
                    onChange={(e) => handleStatusUpdate(fb._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(fb._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Prev
        </button>
        <span className="px-2 py-1">{page} / {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}