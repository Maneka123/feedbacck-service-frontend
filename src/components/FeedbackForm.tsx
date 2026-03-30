'use client';

import { useState } from 'react';
import axios from 'axios';

export default function FeedbackForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    // Client-side validation
    if (!title.trim()) {
      setError('Title cannot be empty.');
      return;
    }
    if (description.trim().length < 20) {
      setError('Description must be at least 20 characters long.');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }
    if (!submitterName.trim()) {
      setError('Name cannot be empty.');
      return;
    }
    if (!submitterEmail.trim()) {
      setError('Email cannot be empty.');
      return;
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(submitterEmail)) {
      setError('Please enter a valid email.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4001/api/feedback', {
        title,
        description,
        category,
        submitterName,
        submitterEmail,
      });

      setSuccess('Feedback submitted successfully!');
      setTitle('');
      setDescription('');
      setCategory('');
      setSubmitterName('');
      setSubmitterEmail('');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit feedback');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>

      {/* Form container with increased height */}
      <div className="relative z-10 w-full max-w-xl p-8 min-h-[650px] bg-white bg-opacity-90 rounded shadow-md backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Feedback</h2>

        {success && <p className="text-green-500 mb-3">{success}</p>}
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded"
            rows={6}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Bug">Bug</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Improvement">Improvement</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Your Name"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={submitterEmail}
            onChange={(e) => setSubmitterEmail(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}