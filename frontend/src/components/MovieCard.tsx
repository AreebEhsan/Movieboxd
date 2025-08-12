'use client';

import Link from 'next/link';

interface Props {
  movie: {
    imdbId: string;
    title: string;
    releaseDate: string;
    poster: string;
    genres: string[];
  };
}

export default function MovieCard({ movie }: Props) {
  return (
    <Link href={`/movies/${movie.imdbId}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 cursor-pointer">
        <img
          src={movie.poster}
          alt={movie.title}
          className="rounded w-full h-64 object-cover mb-4"
        />
        <h2 className="text-xl font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-500">{movie.releaseDate}</p>
        <div className="text-xs text-gray-600 mt-2">{movie.genres.join(', ')}</div>
      </div>
    </Link>
  );
}
