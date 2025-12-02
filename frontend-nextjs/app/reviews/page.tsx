'use client';

import { useState, useEffect } from 'react';
import { reviewsAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Review {
  review_id: number;
  customer_name: string;
  rating: number;
  comment: string;
  review_date: string;
}

export default function ReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    product_id: 1,
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      // Try to fetch reviews for a specific product (e.g., product_id 1)
      // In a real app, you might want to show all reviews or reviews for featured products
      const response = await reviewsAPI.getByProduct(1);
      setReviews(response.reviews || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      // Fallback to default reviews if API fails
      setReviews([
        {
          review_id: 1,
          customer_name: 'Zara',
          rating: 5,
          comment: 'The caramel latte is absolutely divine! My go-to every morning.',
          review_date: new Date().toISOString(),
        },
        {
          review_id: 2,
          customer_name: 'Ali',
          rating: 5,
          comment: 'Loved the ambience and quick service. Highly recommended.',
          review_date: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    try {
      await reviewsAPI.create(formData);
      alert('Review submitted successfully!');
      setFormData({ product_id: 1, rating: 5, comment: '' });
      setShowForm(false);
      loadReviews();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to submit review');
    }
  };

  return (
    <>
      <header>
        <h1>Customer Reviews</h1>
        <p>Hear what our coffee lovers have to say!</p>
      </header>

      <section className="content">
        <div className="review-box">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {reviews.map((review) => (
                <div key={review.review_id}>
                  <h3>
                    {'⭐'.repeat(review.rating)} {review.customer_name}
                  </h3>
                  <p>&quot;{review.comment || 'No comment provided'}&quot;</p>
                  <hr />
                </div>
              ))}

              {user && (
                <div className="mt-4">
                  {!showForm ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowForm(true)}
                    >
                      Write a Review
                    </button>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-3">
                      <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <select
                          className="form-control"
                          value={formData.rating}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              rating: parseInt(e.target.value),
                            })
                          }
                        >
                          <option value={5}>5 ⭐</option>
                          <option value={4}>4 ⭐</option>
                          <option value={3}>3 ⭐</option>
                          <option value={2}>2 ⭐</option>
                          <option value={1}>1 ⭐</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Comment</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={formData.comment}
                          onChange={(e) =>
                            setFormData({ ...formData, comment: e.target.value })
                          }
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary me-2">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

