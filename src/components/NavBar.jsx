import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colorBrown, desktopMediaQuery } from './Styles';

/*################*/
/*#### STYLES ####*/
/*################*/

const NavContainer = styled.div`
  height: 8vh;
  width: 100vw;
  position: fixed;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -8vh;
  padding: 0 10px;
  box-shadow: 0px 4px 20px #0008;
  background-color: whitesmoke;
  overflow: hidden;
`;

const Tittle = styled.h1`
  font-size: 2.3em;
  font-weight: 200;
  display: felex;
  justify-content: center;
  align-items: center;
  color: #000;

  ${desktopMediaQuery} {
    font-size: 3em;
  }
`;

const TittleCircle = styled.div`
  height: 10px;
  width: 10px;
  margin: 0 15px;
  border-radius: 100%;
  background: #000;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const NavBar = () => {
  return (
    <>
      <NavContainer>
        <HamburgerMenu />
        <Link style={{ textDecoration: 'none' }} to="/">
          <Tittle>
            <TittleCircle />
            Toscana
            <TittleCircle />
          </Tittle>
        </Link>
      </NavContainer>
    </>
  );
};
export default NavBar;
