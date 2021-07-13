import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../components/Firebase';
import InfoCard from '../components/InfoCard';
import ProductSlider from '../components/ProductSlider';

import WppLogo from '../assets/Whatsapp-Logo.png';

/*################*/
/*#### STYLES ####*/
/*################*/

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 8vh;
`;

const ProductName = styled.h3`
  width: 90%;
  margin: 2vh auto 1vh auto;
  font-size: 1.6em;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Price = styled.p`
  width: 90vw;
  margin: 0 auto 1vh auto;
  font-size: 1.5em;
`;

const DescriptionContainer = styled.div`
  width: 90vw;
  margin: 1vh auto;
  padding: 2vh 0;
  border-top: 2px solid #000;
  /* border-bottom: 2px solid #000; */
`;

const Description = styled.p`
  font-size: 1em;
  letter-spacing: 1px;
  color: #000;
`;

const DescriptionTittle = styled.h4`
  margin-bottom: 1vh;
  font-size: 1.2em;
`;

const Btn = styled(Link)`
  width: 90%;
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0vh auto 2vh auto;
  background: #00e676;
  border: none;
  border-radius: 10px;
  color: #000;
  text-decoration: none;
  font-size: 1.3em;

  &:hover {
    background: #00ce69;
  }
`;

const Icon = styled.img`
  height: 60%;
  margin: auto 3vw;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const ProductPage = () => {
  //copletar en el useState el objeto con los datos vacios
  const [productData, setProductData] = useState({ model: '', price: undefined, imgsURL: [''] });
  const params = useParams();

  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  useEffect(() => {
    let _isMounted = true;
    const getData = async (category, proudctId) => {
      //trae los datos del producto solicitado
      const productRequest = await db.collection(category).doc(proudctId).get();

      // previene memory leack
      if (_isMounted) setProductData(productRequest.data());
      console.log(productRequest.data());
    };
    getData(params.category, params.productId);

    return () => {
      _isMounted = false;
    };
  }, []);

  return (
    <>
      <Main>
        <ProductSlider imgsURL={productData.imgsURL} />

        <ProductName>{productData.model}</ProductName>
        <Price>${productData.price}</Price>

        <DescriptionContainer>
          <DescriptionTittle>Description:</DescriptionTittle>
          <Description>{productData.description}</Description>
        </DescriptionContainer>

        <Btn
          as="a"
          href={`https://wa.me/5491140902700?text=Hola buenos dias, queria consultar por el ${
            productData.category
          } modelo ${productData.model.replace('Modelo ', '')}`}
        >
          Consultá <Icon src={WppLogo} />
        </Btn>

        <InfoCard
          tittle="Zona Sur, Avellaneda"
          description="Envios a todo el pais y puntos de encuentro"
          icon="location"
        />
        <InfoCard
          tittle="Medios de pago"
          description="Aceptamos pagos en efectivo, mercado pago o tranferencia"
          icon="money"
        />
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
