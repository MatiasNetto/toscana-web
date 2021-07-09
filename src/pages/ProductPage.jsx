import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { db } from '../components/Firebase';

//components
import NavBar from '../components/NavBar';

//STYLES

const Main = styled.main`
  height: 92vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProductPage = () => {
  const [productData, setProductData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getData = async (category, proudctId) => {
      //trae los datos del producto solicitado
      const productRequest = await db.collection(category).doc(proudctId).get();
      setProductData(productRequest.data());
    };
    getData(params.category, params.productId);
  }, []);

  return (
    <>
      <NavBar />

      <Main>
        <h2>titulo</h2>
      </Main>

      {/* teapa todo lo anterior y muestra el mensaje deseado dependiendo que ocurra */}
      {productData === undefined ? ( //condicion
        //si el producto no existe:
        <h1>No se encontro el producto</h1>
      ) : (
        //si encuentra el producto:
        <div>
          {productData === null ? (
            //Cuando el producto se encuentra cargando

            <h2>cargando...</h2>
          ) : (
            //Cuando el producto se enconctro

            <></>
          )}
        </div>
      )}
    </>
  );
};

export default ProductPage;
