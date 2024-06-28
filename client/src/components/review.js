import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './review.css';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [airline, setAirline] = useState('');
  const [reviews, setReviews] = useState([]);
  const [selectedAirlineReviews, setSelectedAirlineReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/getReviews`, { airline });
        setSelectedAirlineReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (showModal && airline) {
      fetchReviews();
    }
  }, [showModal, airline]);

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAirlineChange = (event) => {
    setAirline(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rating === 0 || comment.trim() === '' || airline.trim() === '') {
      alert('Please provide a rating, comment, and select an airline.');
      return;
    }
    const name = localStorage.getItem('name');
    try {
      const response = await axios.post('http://localhost:8000/reviews', {
        name,
        rating,
        comment,
        airline,
      });
      console.log('Review submitted successfully:', response.data);

      // Update reviews state with the new review
      setReviews([...reviews, response.data]);

      // Clear input fields after submission
      setRating(0);
      setComment('');
      setAirline('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAirlineReviews([]);
  };

  const handleViewReviews = () => {
    setShowModal(true);
  };

  return (
    <div className="review-component">
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="airline">Airline:</label>
          <input
            type="text"
            id="airline"
            className="form-control"
            value={airline}
            onChange={handleAirlineChange}
            placeholder="Enter airline name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            className="form-control"
            value={rating}
            onChange={handleRatingChange}
            required
          >
            <option value="0">Select Rating</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            className="form-control"
            value={comment}
            onChange={handleCommentChange}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {airline && (
          <button
            type="button"
            className="btn btn-outline-primary ms-2"
            onClick={handleViewReviews}
          >
            Read Reviews for {airline}
          </button>
        )}
      </form>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h3>Reviews for {airline}</h3>
            {selectedAirlineReviews.length === 0 ? (
              <p>No reviews yet for {airline}.</p>
            ) : (
              <ul className="list-group">
                {selectedAirlineReviews.map((review) => (
                  <li key={review.id} className="list-group-item">
                    <div className="author">{review.author}</div>
                    <div className="rating">
                      Rating: {review.rating} stars
                      <span role="img" aria-label="star">
                        {' '}
                        ★
                      </span>
                    </div>
                    <div className="comment">{review.comment}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <hr />

      {/* Display all reviews */}
      <h2>All Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="list-group">
          {reviews.map((review) => (
            <li key={review.id} className="list-group-item">
              <p>Rating: {review.rating} stars</p>
              <p>Airline: {review.airline}</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Review;
