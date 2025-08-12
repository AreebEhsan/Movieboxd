'use client';

interface Review {
  id: string;
  body: string;
  created: string;
  updated: string;
}

interface Props {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return <p className="text-gray-500 italic mb-4">No reviews yet. Be the first to add one!</p>;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, idx) => (
  <div
    key={(typeof review.id === 'string'
      ? review.id
      : (review.id as any)?.$oid) || `review-${idx}`}
    className="bg-gray-100 rounded p-4 shadow"
  >
    <p className="text-gray-800">{review.body}</p>
    <p className="text-sm text-gray-500 mt-2">
      {new Date(review.created).toLocaleString()}
    </p>
  </div>
))}

      </div>
    </div>
  );
}
