import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProductsGirid from '../components/ProductsGrid';

//components
import { Subtittle } from '../components/Styles';
import styled from 'styled-components';
import { useGetProductsCollection } from '../hooks/useGetProductsCollection';

/*################*/
/*#### STYLES ####*/
/*################*/

const Content = styled.div`
  margin-top: 8vh;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const CartegoryPage = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false });
  const params = useParams();

  let { collection, isPending, err } = useGetProductsCollection(params.category);

  useEffect(() => {
    console.log('isPendingChange');
    setProducts(collection);
    setError(err);
    setLoading(isPending);
  }, [isPending]);

  return (
    <>
      <Content>
        <Subtittle>{params.category.toUpperCase()}</Subtittle>
        {loading == true ? (
          <p>cargando</p>
        ) : error.error ? (
          <strong>Ocurrio un error, {error.code}</strong>
        ) : (
          <ProductsGirid products={products} />
        )}
      </Content>
    </>
  );
};

export default CartegoryPage;
