'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import MovieCard from '@/components/MovieCard';

interface Movie {
  imdbId: string;
  title: string;
  releaseDate: string;
  poster: string;
  genres: string[];
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/movies')
      .then(res => setMovies(res.data))
      .catch(() => setError('Failed to load movies.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.imdbId} movie={movie} />
      ))}
    </main>
  );
}
