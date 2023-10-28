import React, { useEffect, useState }  from 'react';
import styled from '@emotion/styled';

const ChatBot: React.FC = () => {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    async function getMicrophoneAccess() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone access successfully obtained:', stream);

        let recognition: any;

        if ('SpeechRecognition' in window) {
          recognition = new (window as any).SpeechRecognition();
        } else if ('webkitSpeechRecognition' in window) {
          recognition = new (window as any).webkitSpeechRecognition();
        } else {
          console.error('Speech recognition not supported');
          return;
        }

        recognition.lang = 'en-US';

        recognition.start();
        console.log('Ready to receive a command.');

        recognition.onresult = function (event: any) {
          console.log('Transcript:'); // Log the transcript to the console
          const speechToText = event.results[0][0].transcript;
          setTranscript(speechToText);
          console.log(speechToText); // Log the transcript to the console

          fetch('http://localhost:5000/receive_transcript', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript: speechToText }),
          })
            .then((response) => {
              if (response.ok) {
                console.log('Transcript sent to the server successfully');
              } else {
                console.error('Failed to send transcript to the server');
              }
            })
            .catch((error) => {
              console.error('Error sending transcript:', error);
            });
        };
      } catch (error) {
        console.error('Error accessing microphone:', error);
        // Handle any errors related to microphone access here
      }
    }
    getMicrophoneAccess();
  }, []);

  return (
    <HeaderContainer>
      {/* <VideoBackground>
        <video autoPlay loop muted>
        <source src="/gradient.mp4" type="video/mp4" />
        </video>
      </VideoBackground> */}
      <TextContainer>
        <h1>Hi, I'm your CareCompanion.</h1>
        <p>What would you like to talk to me about today?</p>
        {/* <button>
          <p>No Microphone?</p>
        </button> */}
        <p>No Microphone? No problem. Click here to type your messages into our chatbot instead.</p>
          {/* <Link> */}
             {/* here  */}
          {/* </Link> */}          
      </TextContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.main`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
`;

const VideoBackground = styled.div`
  > video {
    height: 1000px;
    width: 100vw;
    display: flex;
    object-fit: cover;
    position: absolute;
    z-index: 0;
    top: 0px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  position: absolute;
  top: 280px;
  width: 100vw;
  flex-direction: column;
  z-index: 10;
  > p {
    z-index: 1;
    font-size: 24px;
    text-align: center;
    font-family: 'Helvetica Now';
    font-weight: 500;
    font-style: italic;
    color: black;
    width: 70%;
    margin-left: 15%;
    margin-right: 10%;
  }
  > h1 {
    font-family: 'Helvetica Now';
    font-size: 4.4rem;
    font-weight: 900;
    text-align: center;
    color: black;
    width: 70vw;
    margin-top: 0px;
    margin-left: 15%;
    margin-right: 10%;
  }
  > button {
    width: 300px;
    height: 80px;
    background-color: black;
    color: white;
    font-family: 'Helvetica Now';
    font-size: 20px;
    font-style: italic;
    border-radius: 12px;
    border: none;
    align-self: center;
    margin-top: 40px;
    transition: 300ms;
    cursor: pointer;
    :hover {
      background-color: white;
      color: black;
    }
  }
`;

export default ChatBot;
