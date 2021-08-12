import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGetProductsCollection } from '../../hooks/useGetProductsCollection';
import PageLoader from '../../components/PageLoader';
import ProductRow from '../../components/adminPage/ProductRow';
import { useAuth } from '../../auth/AuthContext';
import ProductsTable from '../../components/adminPage/ProductsTable';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const TopFormBar = styled.div`
  width: 98%;
  height: 10vh;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const TopFormBarText = styled.p`
  font-size: 1.3em;
`;

const Button = styled.button`
  height: 50%;
  width: fit-content;
  position: absolute;
  right: 0;
  padding: 5px 20px;
  font-size: 1.1em;
  background: #fed610;
  box-shadow: 0px 5px 5px #0004;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    filter: brightness(90%);
  }
`;

// const Button = styled.button`
//   height: 35%;
//   width: 30%;
//   margin: 0 10px;
//   font-size: 1em;
//   background: ${({ color }) => (color ? color : `#fff`)};
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: all 0.3s;
// `;

const CategorySelect = styled.select`
  width: fit-content;
  height: fit-content;
  margin-left: 10px;
  font-size: 1.5em;
  background: transparent;
  border: none;
  border-bottom: 2px solid #000;
  cursor: pointer;
`;

const ProductsContainer = styled.div`
  width: 98%;
  margin: 0 auto;
`;

const Products = () => {
  const [category, setCategory] = useState('anillos');
  const [reload, setReload] = useState(false); //establece con el valor default que establece la condicion anterior
  const { currentUser } = useAuth();

  const handleCategoryChange = (e) => {
    // setAwaiting(true);
    setReload(true);
    setReload(false);
    setCategory(e.target.value);
  };

  return (
    <Container>
      <TopFormBar>
        <TopFormBarText>Category: </TopFormBarText>
        <CategorySelect onChange={handleCategoryChange} name="category">
          <option value="anillos">Anillos</option>
          <option value="aros">Aros</option>
          <option value="collares">Collares</option>
          <option value="pulseras">Pulseras</option>
          <option value="relojes">Relojes</option>
          {currentUser.email === 'admin@admin.com' && <option value="testcategory">Test</option>}
        </CategorySelect>
        <Button>+ ADD PRODUCT</Button>
      </TopFormBar>

      <ProductsContainer>{reload === true ? <PageLoader /> : <ProductsTable category={category} />}</ProductsContainer>
    </Container>
  );
};

export default Products;
