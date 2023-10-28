import React from 'react';
import styled from '@emotion/styled';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <VideoBackground>
        <video autoPlay loop muted>
        <source src="/gradient.mp4" type="video/mp4" />
        </video>
      </VideoBackground>
      <TextContainer>
        <p>It's time to meet</p>
        <h1>CareCompanion, an AI Medical Assistant for Your Personalized Health.</h1>
        <button>
          <p>Get Started</p>
        </button>
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
    text-align: left;
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
    text-align: left;
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

export default Header;
