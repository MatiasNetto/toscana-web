import React from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  width: 5vw;
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MenuContainer = styled.div`
  height: 100%;
  width: 5vw;
  background: #224;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    width: 15vw;
  }
`;

const Icon = styled.i`
  position: absolute;
  left: 1.333vw;
  font-size: 1.5em;
`;

const ListItem = styled.div`
  width: 100%;
  height: 7vh;
  position: relative;
  display: flex;
  align-items: center;
  color: ${({ active }) => (active ? `#000` : `#fff`)};
  background: ${({ active }) => (active ? `#fff` : `#000`)};
  margin-top: 8vh;
  cursor: pointer;
`;

const Text = styled.p`
  position: absolute;
  left: 5vw;
  font-size: 1.5em;
`;

const Menu = () => {
  const history = useHistory();
  const params = useParams();

  const handleLink = (value) => {
    setTimeout(() => {
      history.push(`/admin/${value}`);
    }, 10);
  };

  return (
    <Container>
      <MenuContainer>
        <ListItem
          active={params.section === 'home' ? true : false}
          onClick={() => {
            handleLink('home');
          }}
        >
          <Icon className="fas fa-home"></Icon>
          <Text>HOME</Text>
        </ListItem>
        <ListItem
          active={params.section === 'products' ? true : false}
          section={params.section}
          onClick={() => {
            handleLink('products');
          }}
        >
          <Icon className="fas fa-tag"></Icon>
          <Text>PRODUCTS</Text>
        </ListItem>
      </MenuContainer>
    </Container>
  );
};

export default Menu;
