import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { colorBrown, colorCrema } from './Styles';

/*################*/
/*#### STYLES ####*/
/*################*/

const Container = styled.div`
  height: 92vh;
  width: 100%;
  border: none;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9999999;
  /* overflow: hidden; */
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

const ContainerMenu = styled.div`
  /* pointer-events: none; */
  height: 92vh;
  width: 100vw;
  position: fixed;
  top: 8vh;
  left: 0;
  z-index: 9999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transform: translateX(-100vw);
  background: ${colorBrown};
  overflow: hidden;

  animation: ${({ isOpen }) => {
      if (isOpen) {
        return openAnimation;
      } else {
        return closeAnimation;
      }
    }}
    0.5s ease
    ${({ isOpen }) => {
      if (isOpen === true) {
        return `forwards`;
      } else {
        return `normal`;
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
  font-size: 1.7em;
  font-weight: 200;
  /* text-align: center; */
  color: ${colorCrema};
  text-decoration: none;
  border-bottom: 3px solid ${colorCrema};
  cursor: pointer;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const Menu = ({ isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(null);
  const history = useHistory();

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
    setIsOpen(false);
  };

  return ReactDOM.createPortal(
    <>
      {/* <Container> */}
      <ContainerMenu isOpen={isOpen}>
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
      </ContainerMenu>
      {/* </Container> */}
    </>,
    document.getElementById('menu-portal')
  );
};

export default Menu;
