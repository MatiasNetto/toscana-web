import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGetProductsCollection } from '../../hooks/useGetProductsCollection';
import PageLoader from '../../components/PageLoader';

const Container = styled.div`
  width: 100%;
  height: fit-content;
`;

const Products = () => {
  const [category, setcategory] = useState('anillos');
  const [products, setProducts] = useState(null);
  const [awaiting, setAwaiting] = useState(true); //establece con el valor default que establece la condicion anterior
  const [error, setError] = useState({ error: false });

  let { collection, isPending, err } = useGetProductsCollection(category, true, true);

  useEffect(() => {
    if (awaiting === true) {
      setProducts(collection);
      setError(err);
      setAwaiting(isPending);
    }
  }, [isPending]);

  return (
    <Container>
      {awaiting === true ? <PageLoader /> : <p>{JSON.stringify(products)}</p>}
      <h1>Products</h1>
      <p>Product</p>
      <p>Product</p>
      <p>Product</p>
      <p>Product</p>
    </Container>
  );
};

export default Products;
