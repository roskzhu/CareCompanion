import React from 'react';
import styled from '@emotion/styled';
import Header from './Header';
// import BlackBar from './BlackBar';
// import Features from './Features';

const Landing: React.FC = () => {
  return (
    <LandingContainer>
      <Header />
      {/* <BlackBar /> */}
      {/* <Features /> */}
    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Landing;
