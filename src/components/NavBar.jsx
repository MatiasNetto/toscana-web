import React, { useState } from 'react';
import HamburgerMenu from './Menu';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colorBrown, desktopMediaQuery } from './Styles';
import Menu from './Menu';

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
  /* overflow: hidden; */
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

const Hamburger = styled.button`
  height: 8vh;
  width: 8vh;
  position: absolute;
  left: 0;
  z-index: 9999999;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: whitesmoke;
  border: none;
  padding: 1.5vh 1.5vh;
  margin-left: 0px;
  cursor: pointer;
`;

const HamburgerCross = css`
  transform: translateX(-20px);
  background: transparent;

  &::after {
    transform: translateY(0) translateX(20px) rotate(45deg);
  }

  &::before {
    transform: translateY(0) translateX(20px) rotate(-45deg);
  }
`;

const HamburgerLinesClose = styled.div`
  height: 5px;
  width: 100%;
  position: relative;
  background-color: black;
  border-radius: 100px;
  transition: all 0.6s ease-in-out;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    height: 5px;
    width: 100%;
    position: absolute;
    left: 0;
    background-color: black;
    border-radius: 100px;
    transition: all 0.6s ease-in-out;
  }

  &::after {
    transform: translateY(1.5vh);
  }

  &::before {
    transform: translateY(-1.5vh);
  }

  ${desktopMediaQuery} {
    height: 8px;
    &::before,
    &::after {
      height: 8px;
    }

    &::after {
      transform: translateY(1.8vh);
    }

    &::before {
      transform: translateY(-1.8vh);
    }
  }

  ${({ isOpen }) => {
    if (isOpen === true) {
      return HamburgerCross;
    }
  }}
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(null);

  const handleOpenMenu = () => {
    if (isOpen === false || isOpen === null) {
      setIsOpen(true);
      //open animation
    }
    if (isOpen === true) {
      setIsOpen(false);
      //close animation
    }
  };
  return (
    <>
      <NavContainer id="home">
        {/* <HamburgerMenu /> */}
        <Hamburger onClick={handleOpenMenu}>
          <HamburgerLinesClose isOpen={isOpen} />
        </Hamburger>
        <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
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
