import React, { useState } from 'react';
import WebcamComponent from './components/WebcamComponent';
import FeedbackForm from './components/Feedback_Form';

function App() {
  const [detectedEmotion, setDetectedEmotion] = useState("No face detected");

  return (
    <div>
      <h1>Emotion Feedback System</h1>
      <WebcamComponent setDetectedEmotion={setDetectedEmotion} />
      <h2>Detected Emotion: {detectedEmotion}</h2>
      <FeedbackForm emotion={detectedEmotion} />
    </div>
  );
}

export default App;
