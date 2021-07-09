import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//STYLES

const NavContainer = styled.div`
  height: 8vh;
  width: 100vw;
  position: fixed;
  z-index: 999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -8vh;
  padding: 0 10px;
  box-shadow: 0px 4px 20px #0008;
  background-color: whitesmoke;
  overflow: hidden;
`;

const Tittle = styled.h1`
  font-size: 2.3em;
  color: #000;
`;

const NavBar = () => {
  return (
    <>
      <NavContainer>
        <Link style={{ textDecoration: 'none' }} to="/">
          <Tittle>Toscana</Tittle>
        </Link>
        <HamburgerMenu />
      </NavContainer>
    </>
  );
};
export default NavBar;
