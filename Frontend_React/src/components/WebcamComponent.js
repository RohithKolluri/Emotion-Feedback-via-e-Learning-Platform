import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamComponent = ({ setDetectedEmotion }) => {
  const webcamRef = useRef(null);

  // Load face-api.js models from the 'public/models' folder
  const loadModels = async () => {
    const MODEL_URL = '/models'; // Path to your models folder in the public directory

    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

    console.log('Models loaded');
  };

  // Detect faces and emotions in the webcam feed
  const detectFaceAndEmotion = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 // Ensure the video is ready
    ) {
      const video = webcamRef.current.video;
      const detections = await faceapi.detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length > 0) {
        console.log("Detected faces:", detections);

        // Detect the most likely emotion
        const expressions = detections[0].expressions;
        const dominantEmotion = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );

        setDetectedEmotion(dominantEmotion); // Update detected emotion
      } else {
        setDetectedEmotion("No face detected");
      }
    }
  };

  useEffect(() => {
    loadModels(); // Load models on component mount
    const intervalId = setInterval(detectFaceAndEmotion, 1000); // Run every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default WebcamComponent;
