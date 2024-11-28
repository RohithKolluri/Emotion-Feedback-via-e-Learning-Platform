import React, { useState } from 'react';

const FeedbackForm = ({ emotion }) => {
  const [feedback, setFeedback] = useState('');

  // Handle feedback form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    setFeedback(''); // Clear the feedback form
  };

  return (
    <div>
      <h3>Feedback for Emotion: {emotion}</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
