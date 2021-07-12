import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProductsGirid from '../components/ProductsGrid';

import { db } from '../components/Firebase';

//components
import { Subtittle } from '../components/Styles';
import styled from 'styled-components';

//STYLES

const Content = styled.div`
  margin-top: 8vh;
`;

//COMPONENT

const CartegoryPage = () => {
  const [products, setProducts] = useState(null);
  const params = useParams();

  useEffect(() => {
    let _isMounted = true;

    const getProductList = async () => {
      //trae los productos desde la categoria indicada por parametros y los almacena en productsFragment
      let productsFragment = [];
      const productsRequest = await db.collection(params.category).get();

      productsRequest.forEach((product) => {
        //Recorre la data traida y agrega los productos a productsFragment
        console.log(product.data().imgsURL);
        productsFragment = [...productsFragment, product.data()];
      });

      //setea el state products como productsFragment para no andar actualizando todo el tiempo el state, previene memory leack
      if (_isMounted) setProducts(productsFragment);
    };

    getProductList(); //Llama la funcion asincrona

    //Cuando el componente se desmonte, cancela toda actualizacion de estado
    return () => {
      _isMounted = false;
    };
  }, []);

  return (
    <>
      <Content>
        <Subtittle>{params.category.toUpperCase()}</Subtittle>
        <ProductsGirid products={products} />
      </Content>
    </>
  );
};

export default CartegoryPage;
