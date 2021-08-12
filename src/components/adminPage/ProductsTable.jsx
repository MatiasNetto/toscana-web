import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGetProductsCollection } from '../../hooks/useGetProductsCollection';
import PageLoader from '../PageLoader';
import { colorBrown } from '../Styles';
import ProductRow from './ProductRow';

const Table = styled.table`
  border: 2px solid ${colorBrown};
  border-collapse: collapse;
`;

const Th = styled.th`
  font-size: 1.1em;
`;

const ProductsTable = ({ category }) => {
  const [products, setProducts] = useState(null);
  const [awaiting, setAwaiting] = useState(true); //establece con el valor default que establece la condicion anterior
  const [error, setError] = useState({ error: false });
  let dark = false;

  let { collection, isPending, err } = useGetProductsCollection(category, true, true);

  useEffect(() => {
    if (awaiting === true) {
      setProducts(collection);
      setError(err);
      setAwaiting(isPending);
    }
  }, [isPending]);

  useEffect(() => {
    setAwaiting(true);
    setProducts(null);
  }, [category]);

  return (
    <>
      {awaiting ? (
        <PageLoader />
      ) : (
        <Table table style={{ width: '100%' }}>
          <thead>
            <tr style={{ height: '5vh' }}>
              <Th style={{ width: '10%' }}>Image</Th>
              <Th style={{ width: '15%' }}>Model</Th>
              <Th style={{ width: '10%' }}>Price</Th>
              <Th style={{ width: '20%' }}>Description</Th>
              <Th style={{ width: '10%' }}>Relevance</Th>
              <Th style={{ width: '15%' }}>Tags</Th>
              <Th style={{ width: '20%' }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              dark = !dark;
              return <ProductRow data={product} dark={dark} key={product.id} />;
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductsTable;
