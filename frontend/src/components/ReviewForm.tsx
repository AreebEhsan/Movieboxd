'use client';

import { useState } from 'react';
import api from '@/lib/axios';

interface Props {
  imdbId: string;
  onReviewAdded: () => void;
}

export default function ReviewForm({ imdbId, onReviewAdded }: Props) {
  const [reviewBody, setReviewBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await api.post('/reviews', {
        imdbId,
        reviewBody,
      });
      setReviewBody('');
      setSuccess(true);
      onReviewAdded();
    } catch (err) {
      setError('Failed to submit review. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 mt-6">
      <h3 className="text-xl font-semibold mb-2">Add a Review</h3>
      <textarea
        value={reviewBody}
        onChange={(e) => setReviewBody(e.target.value)}
        placeholder="Write your review..."
        className="w-full border rounded p-2 h-28 resize-none mb-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {success && <p className="text-green-600 mt-2">Review submitted successfully!</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
