export default function getAvgRating (reviews = [])  {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return 0;
  }

  const total = reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  return (total / reviews.length).toFixed(1);
};


