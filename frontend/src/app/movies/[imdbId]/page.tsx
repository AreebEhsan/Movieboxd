'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/axios';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';

interface Review {
  id: string;
  body: string;
  created: string;
  updated: string;
}

interface Movie {
  imdbId: string;
  title: string;
  releaseDate: string;
  poster: string;
  backdrops: string[];
  genres: string[];
  reviews: Review[];
}

export default function MovieDetailPage() {
  const { imdbId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMovie = () => {
    api.get(`/movies/${imdbId}`)
      .then(res => setMovie(res.data))
      .catch(() => setError('Failed to load movie details.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMovie();
  }, [imdbId]);

  const handleReviewAdded = () => {
    fetchMovie(); // Refresh movie to include new review
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !movie) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={movie.poster} alt={movie.title} className="w-full h-auto rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-600 mb-2">Released: {movie.releaseDate}</p>
      <p className="mb-4">Genres: {movie.genres.join(', ')}</p>

      {movie.backdrops?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {movie.backdrops.map((url, idx) => (
            <img key={idx} src={url} className="rounded" />
          ))}
        </div>
      )}

      <ReviewList reviews={movie.reviews} />
      <ReviewForm imdbId={movie.imdbId} onReviewAdded={handleReviewAdded} />
    </div>
  );
}
