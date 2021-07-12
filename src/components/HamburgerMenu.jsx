import React from 'react';
import styled from 'styled-components';

/*################*/
/*#### STYLES ####*/
/*################*/

const Hamburger = styled.button`
  height: 6vh;
  width: 6vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: whitesmoke;
  border: none;
`;

const Line = styled.div`
  height: 15%;
  width: 100%;
  background-color: black;
  border-radius: 100px;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const HamburgerMenu = () => {
  return (
    <>
      <Hamburger>
        <Line />
        <Line />
        <Line />
      </Hamburger>
    </>
  );
};

export default HamburgerMenu;
