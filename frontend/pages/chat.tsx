// pages/chat.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ChatComponent from '../components/ChatComponent';

const ChatPage = () => {
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean | null>(null);
  const [speechRecognition, setSpeechRecognition] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    const requestMicrophoneAndSpeechRecognition = async () => {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneAccess(true);

        // Set up MediaRecorder to capture audio
        const recorder = new MediaRecorder(stream);
        let audioChunks: Blob[] = [];

        recorder.onstart = () => console.log('Recording started.');
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };
        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioData = await audioBlob.arrayBuffer();

          // Read Google Cloud API key from environment variable
          const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;

          // Send a POST request to your backend for transcription using Google Cloud Speech-to-Text
          try {
            const response = await fetch('http://localhost:3000/transcribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': `Bearer ${apiKey}`, // Use the API key from the environment variable
              },
              body: audioData,
            });

            if (!response.ok) {
              console.error('Failed to transcribe audio:', response.statusText);
            } else {
              console.log('Audio transcribed successfully.');
            }
          } catch (error) {
            console.error('Error transcribing audio:', error);
          }

          audioChunks = [];
        };

        // Start recording
        recorder.start();

        // Save the MediaRecorder instance in state
        setSpeechRecognition(recorder);

        // Don't forget to stop the stream when you're done using it
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.error('Error accessing the microphone:', error);
        setMicrophoneAccess(false);
      }
    };

    // Call the function to request microphone access and set up audio recording
    requestMicrophoneAndSpeechRecognition();

    // Clean up: stop recording when the component unmounts
    return () => {
      if (speechRecognition) {
        speechRecognition.stop();
      }
    };
  }, [speechRecognition]);

  return (
    <Layout title="Chat Page">
      <div>
        <h1>Chat Page</h1>
        {microphoneAccess === null ? (
          <p>Requesting microphone access...</p>
        ) : microphoneAccess ? (
          <ChatComponent />
        ) : (
          <p>Microphone access denied or not available.</p>
        )}
      </div>
    </Layout>
  );
};

export default ChatPage;
