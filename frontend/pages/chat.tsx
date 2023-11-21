// pages/chat.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ChatComponent from '../components/ChatComponent';

const ChatPage = () => {
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean | null>(null);
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    const requestMicrophoneAndSpeechRecognition = async () => {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneAccess(true);

        // Set up SpeechRecognition
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => console.log('Speech recognition started.');
        recognition.onerror = (event) => console.error('Speech recognition error:', event.error);
        recognition.onresult = async (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join('');
          console.log('Speech recognition result:', transcript);

          // Encode the transcript to base64
          const audioData = btoa(transcript);

          // Send a POST request to your backend
          try {
            const response = await fetch('http://your-backend/transcribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // or 'application/x-www-form-urlencoded', depending on your backend
              },
              body: JSON.stringify({ audioData }),
            });

            if (!response.ok) {
              console.error('Failed to send transcription to backend:', response.statusText);
            } else {
              console.log('Transcription sent to backend successfully.');
            }
          } catch (error) {
            console.error('Error sending transcription to backend:', error);
          }
        };

        // Start speech recognition
        recognition.start();

        // Save the SpeechRecognition instance in state
        setSpeechRecognition(recognition);

        // Don't forget to stop the stream when you're done using it
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.error('Error accessing the microphone:', error);
        setMicrophoneAccess(false);
      }
    };

    // Call the function to request microphone access and set up speech recognition
    requestMicrophoneAndSpeechRecognition();

    // Clean up: stop speech recognition when the component unmounts
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
