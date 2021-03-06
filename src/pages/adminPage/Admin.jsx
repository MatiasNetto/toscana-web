import React, { useEffect } from 'react';
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
  width: 95vw;
  margin-left: 5vw;
`;

const Admin = () => {
  const params = useParams();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

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
