'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminNavbar from './AdminNavbar';

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
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

  const fetchFeedback = async () => {
    if (!token) {
      router.push('/admin-login');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4001/api/feedback/list?page=${page}&limit=5`, {
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
        `http://localhost:4001/api/feedback/${id}/status`,
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
      await axios.delete(`http://localhost:4001/api/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFeedback(); // Refresh table
    } catch (err) {
      console.error(err);
      alert('Failed to delete feedback');
    }
  };

  const handleView = async (id: string) => {
    if (!token) return;

    try {
      const res = await axios.get(`http://localhost:4001/api/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedFeedback(res.data.data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch feedback details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <AdminNavbar />

      <div className="p-6">
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
                <th className="p-2">View</th>
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
                  <td className="p-2">
                    <button
                      onClick={() => handleView(fb._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      View
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

        {/* Modal */}
        {showModal && selectedFeedback && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-2">{selectedFeedback.title}</h2>
              <p><strong>Category:</strong> {selectedFeedback.category}</p>
              <p><strong>Status:</strong> {selectedFeedback.status}</p>
              <p><strong>Description:</strong> {selectedFeedback.description}</p>
              <p><strong>AI Category:</strong> {selectedFeedback.ai_category || '-'}</p>
              <p><strong>Priority:</strong> {selectedFeedback.ai_priority ?? '-'}</p>
              <p><strong>Sentiment:</strong> {selectedFeedback.ai_sentiment || '-'}</p>
              <p><strong>AI Summary:</strong> {selectedFeedback.ai_summary || '-'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}