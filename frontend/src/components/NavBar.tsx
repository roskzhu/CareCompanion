import React from 'react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
// import { ReactComponent as Star } from '../res/star.svg';

const NavBar: React.FC = () => {
  const location = useLocation();
  return (
    <NavContainer>
      <LeftBarContainer>
        <LeftBar>
        {/* <Link to='/' className='link'> */}
            <p>
              CareCompanion
            </p>
          {/* </Link> */}
        </LeftBar>
        <Filter className="flt_svg hide" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="flt_tag">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />    
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
              <feComposite in="SourceGraphic" in2="flt_tag" operator="atop"/>
            </filter>
          </defs>
        </Filter>
      </LeftBarContainer>
      <RightBarContainer>
        <RightBar>
          <Link to='/' className='link'>
            <p>
              Landing
            </p>
          </Link>
          <Link to='/chat' className='link'>
            <p>
              Chat here
            </p>
          </Link>
          <p>
            Portfolio
          </p>
        </RightBar>
        <Filter className="flt_svg hide" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="flt_tag">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />    
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
              <feComposite in="SourceGraphic" in2="flt_tag" operator="atop"/>
            </filter>
          </defs>
        </Filter>
      </RightBarContainer>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  margin-top: 50px;
  width: 100vw;
  z-index: 9999;
  .hide {
    display: none;
  }
`;

const LeftBarContainer = styled.div`
  width: 15vw;
  height: 70px;
  filter: url('#flt_tag');
`;
const LeftBar = styled.div`
  width: 15vw;
  background-color: black;
  height: 70px;
  clip-path: polygon(5% 0%, 100% 0%, 90% 100%, 0% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: white;
    font-family: Helvetica Now;
    font-size: 21px;
    font-weight: 500;
    font-style: italic;
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
  }
`;
const RightBarContainer = styled.div`
  width: 75vw;
  height: 70px;
  filter: url('#flt_tag');
`;
const RightBar = styled.div`
  clip-path: polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%);
  width: 75vw;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .link {
    text-decoration: none;
  }
  p {
    font-family: Helvetica Now;
    font-weight: 500;
    font-style: italic;
    font-size: 18px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .star {
      width: 28px;
      height: 28px;
      margin-right: 15px;
      fill: white;
    }
    :hover {
      .star {
        transition: fill 0.5s ease;
        fill: black;
      }
    }
    .active {
      fill: black;
    }
  }
`;

const Filter = styled.svg`
  visibility: hidden; 
  position: absolute;
`;

export default NavBar;
