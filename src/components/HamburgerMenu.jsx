import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { colorBrown, colorCrema } from './Styles';

/*################*/
/*#### STYLES ####*/
/*################*/

const Container = styled.div`
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  /* overflow: hidden; */
`;

const Hamburger = styled.button`
  height: 8vh;
  width: 6vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: whitesmoke;
  border: none;
  padding: 1vh 0;
  margin-left: 10px;
  cursor: pointer;
`;

const Line = styled.div`
  height: 15%;
  width: 100%;
  background-color: black;
  border-radius: 100px;
`;

const openAnimation = keyframes`
  0% {
    transform: translateX(-100vw)
  }
  100%{
    transform: translateX(0vw)
    
  }
`;

const closeAnimation = keyframes`
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-100vw)
  }
`;

const Menu = styled.div`
  /* pointer-events: none; */
  height: 92vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 8vh;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-around;
  transform: translateX(-100vw);
  background: ${colorBrown};

  animation: ${({ isOpen }) => {
      if (isOpen) {
        return closeAnimation;
      } else {
        return openAnimation;
      }
    }}
    0.3s ease
    ${({ isOpen }) => {
      if (isOpen === true) {
        return `normal`;
      } else {
        return `forwards`;
      }
    }};

  ${({ isOpen }) => {
    if (isOpen === null) {
      return `display: none;`;
    } else {
      return `display: flex`;
    }
  }}
`;

const LinkMenu = styled.p`
  width: fit-content;
  height: fit-content;
  padding: 0 10px;
  font-size: 2em;
  /* text-align: center; */
  color: ${colorCrema};
  text-decoration: none;
  border-bottom: 3px solid ${colorCrema};
  cursor: pointer;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(null);
  const history = useHistory();

  const handleMenuClick = () => {
    if (isOpen === false) setIsOpen(true);
    else if (isOpen === null) setIsOpen(false);
    else setIsOpen(false);
  };

  const handleLinkClick = (e) => {
    history.push('/');
    switch (e.target.attributes.name.value) {
      case 'home':
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        break;

      case 'products':
        window.scroll({
          top: window.innerHeight,
          left: 0,
          behavior: 'smooth',
        });
    }
    setIsOpen(true);
  };

  return (
    <>
      <Container>
        <Hamburger onClick={handleMenuClick} isOpen={isOpen}>
          <Line />
          <Line />
          <Line />
        </Hamburger>
        <Menu isOpen={isOpen}>
          <LinkMenu name="home" onClick={handleLinkClick}>
            Home
          </LinkMenu>
          <LinkMenu name="products" onClick={handleLinkClick}>
            Productos
          </LinkMenu>
          <LinkMenu>Nosotros</LinkMenu>
          <LinkMenu>Materiales</LinkMenu>
          <LinkMenu>Entregas y envios</LinkMenu>
          <LinkMenu>Politica de cambio</LinkMenu>
          <LinkMenu>Contacto</LinkMenu>
        </Menu>
      </Container>
    </>
  );
};

export default HamburgerMenu;
