import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Menu from '../../components/adminPage/Menu';
import Home from './Home';
import Products from './Products';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

const PageContainer = styled.div`
  width: 100%;
`;

const Admin = () => {
  const params = useParams();

  console.log(params.section);
  return (
    <Container>
      <Menu />
      <PageContainer>
        {params.section === 'home' && <Home />}
        {params.section === 'products' && <Products />}
      </PageContainer>
    </Container>
  );
};

export default Admin;
