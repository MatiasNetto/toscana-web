import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  return (
    <Container>
      <h1>Home</h1>
      <p>Product</p>
      <p>Product</p>
      <p>Product</p>
      <p>Product</p>
    </Container>
  );
};

export default Home;
