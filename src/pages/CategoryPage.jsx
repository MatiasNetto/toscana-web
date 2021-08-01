import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProductsGirid from '../components/ProductsGrid';

//components
import { Subtittle } from '../components/Styles';
import styled from 'styled-components';
import { useGetProductsCollection } from '../hooks/useGetProductsCollection';
import PageLoader from '../components/PageLoader';

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
  const params = useParams();

  //si existen datos sobre el producto establece awaitingDefault como falso, en caso de que no existan lo establece como true, para que cargue
  let awaitingDefault = false;
  if (sessionStorage.getItem(params.category) === null) {
    awaitingDefault = true;
  }

  const [products, setProducts] = useState(JSON.parse(sessionStorage.getItem(params.category))); //si existe en el session storage completa con los datos, si no devuelve null
  const [awaiting, setAwaiting] = useState(awaitingDefault); //establece con el valor default que establece la condicion anterior
  const [error, setError] = useState({ error: false });

  //peticion de los productos, se pasa la categoria y el estado inicial de cargando o no
  let { collection, isPending, err } = useGetProductsCollection(params.category, awaitingDefault);

  //cuando cambia el valor de isPending setea el estado con los valores traidos de la peticion solo en caso de que el estado se encuentre en awaiting true
  useEffect(() => {
    //solo en caso de que el estado sea de cargando actualiza los datos del estado
    if (awaiting === true) {
      setProducts(collection);
      setError(err);
      setAwaiting(isPending);
    }
  }, [isPending]);

  //set session storage con los datos de los productos
  useEffect(() => {
    if (products !== null && error.error === false) {
      //setea un objeto con todos los productos
      sessionStorage.setItem(`${params.category}`, JSON.stringify(products));

      //recorre todos los productos y crea una key en el session storage para cada uno
      products.forEach((product) => {
        sessionStorage.setItem(`${product.category}/${product.id}`, JSON.stringify(product));
      });
    }
  }, [products]);

  return (
    <>
      <Content>
        <Subtittle>{params.category.toUpperCase()}</Subtittle>
        {awaiting === true ? (
          <PageLoader />
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
