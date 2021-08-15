import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InfoCard from '../components/InfoCard';
import ProductSlider from '../components/ProductSlider';

import WppLogo from '../assets/Whatsapp-Logo.png';
import useGetProductData from '../hooks/useGetProductData.js';
import PageLoader from '../components/PageLoader';
import { colorBrown, desktopMediaQuery } from '../components/Styles';

/*################*/
/*#### STYLES ####*/
/*################*/

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 8vh;

  ${desktopMediaQuery} {
    width: 80%;
    height: 92vh;
    margin: 0 auto;
    margin-top: 8vh;
    flex-direction: row;
    justify-content: center;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;

  ${desktopMediaQuery} {
    height: auto;
    margin: 2vh 0 2vh 5vw;
    width: 35%;
    justify-content: space-around;
  }
`;

const ProductName = styled.h3`
  width: 90%;
  margin: 2vh auto 1vh auto;
  font-size: 1.7em;
  font-weight: 600;
  letter-spacing: 1px;
  font-weight: 200;
  color: ${colorBrown};

  ${desktopMediaQuery} {
    width: 100%;
    margin: 0vh auto 1vh auto;
    font-size: 2.8em;
  }
`;

const Price = styled.p`
  width: 90%;
  margin: 0 auto 1vh auto;
  font-size: 1.5em;
  color: ${colorBrown};

  ${desktopMediaQuery} {
    width: 100%;
    font-size: 2.8em;
  }
`;

const DescriptionContainer = styled.div`
  width: 90%;
  margin: 1vh auto;
  padding: 2vh 0;
  border-top: 2px solid #000;
  /* border-bottom: 2px solid #000; */

  ${desktopMediaQuery} {
    width: 100%;
  }
`;

const Description = styled.div`
  font-size: 1em;
  letter-spacing: 1px;
  /* color: #000; */
  color: ${colorBrown};

  ${desktopMediaQuery} {
    width: 100%;
    font-size: 1.3em;
  }
`;

const DescriptionTittle = styled.h4`
  margin-bottom: 1vh;
  font-size: 1.2em;
  font-weight: 200;
  color: ${colorBrown};

  ${desktopMediaQuery} {
    width: 100%;
    font-size: 1.5em;
  }
`;

const BtnConsulta = styled(Link)`
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
  font-weight: 200;

  &:hover {
    background: #00ce69;
  }

  ${desktopMediaQuery} {
    width: 100%;
    height: 8vh;
    font-size: 1.6em;
  }
`;

const BtnSinStock = styled(BtnConsulta)`
  background: #777;
  &:hover {
    background: #777;
  }
`;

const Icon = styled.img`
  height: 60%;
  margin: auto 3vw;

  ${desktopMediaQuery} {
    margin: auto 1vw;
  }
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const ProductPage = () => {
  const params = useParams();

  //si existen datos sobre el producto establece awaitingDefault como falso, en caso de que no existan lo establece como true, para que cargue
  let awaitingDefault = false;
  if (sessionStorage.getItem(`${params.category}/${params.productId}`) === null) {
    awaitingDefault = true;
  }

  //si existe en el session storage completa con los datos, si no devuelve null
  const [productData, setProductData] = useState(
    JSON.parse(sessionStorage.getItem(`${params.category}/${params.productId}`))
  );

  const [awaiting, setAwaiting] = useState(awaitingDefault); //establece con el valor default que establece la condicion anterior
  const [error, setError] = useState({ error: false });

  window.scroll({
    top: 0,
    left: 0,
    behavior: 'auto',
  });

  let { data, isPending, err } = useGetProductData(params.category, params.productId, awaitingDefault);

  useEffect(() => {
    if (awaiting === true) {
      setProductData(data);
      setError(err);
      setAwaiting(isPending);
    }
  }, [isPending, err]);

  const generateMessage = (category, model) => {
    //genera el mensaje a enviar segun el modelo y la categoria
    let phoneNumber = '5491145265942';

    switch (category) {
      case 'anillos':
        return `https://wa.me/${phoneNumber}?text=Hola buenos dias, queria consultar por el anillo *${model}*

                                                   -                                                       

        Link: ${window.location.href.replace('http://', '')}`;

      case 'aros':
        return `https://wa.me/${phoneNumber}?text=Hola buenos dias, queria consultar por los aros *${model}*
        
                                                           -                                                       
        
                Link: ${window.location.href.replace('http://', '')}`;

      case 'pulseras':
        return `https://wa.me/${phoneNumber}?text=Hola buenos dias, queria consultar por la pulsera *${model}*

                                                   -                                                       

        Link: ${window.location.href.replace('http://', '')}`;

      case 'collares':
        return `https://wa.me/${phoneNumber}?text=Hola buenos dias, queria consultar por el collar *${model}*

                                                   -                                                       

        Link: ${window.location.href.replace('http://', '')}`;

      case 'relojes':
        return `https://wa.me/${phoneNumber}?text=Hola buenos dias, queria consultar por el reloj *${model}*

                                                   -                                                       

        Link: ${window.location.href.replace('http://', '')}`;
    }
  };

  return (
    <>
      <Main>
        {awaiting === true ? (
          <PageLoader />
        ) : error.error === true ? (
          <strong>Ocurrio un error, {error.code}</strong>
        ) : (
          <>
            <ProductSlider imgsURL={productData.imgsURL} />
            <InfoContainer>
              <ProductName>{productData.model}</ProductName>
              <Price>${productData.price}</Price>

              <DescriptionContainer>
                <DescriptionTittle>Description:</DescriptionTittle>
                <Description>
                  {productData.description.split('\n').map((el) => {
                    return el ? <p key={Math.random()}>{el}</p> : <br key={Math.random()} />;
                  })}
                </Description>
              </DescriptionContainer>

              {/* si el producto se encuentra sin stock renderiza el boton sin stock, si tiene renderiza el boton de consulta */}
              {productData.outOfStock ? (
                <BtnSinStock as="p">Sin Stock</BtnSinStock>
              ) : (
                <BtnConsulta as="a" href={generateMessage(productData.category, productData.model)}>
                  Consultá <Icon src={WppLogo} />
                </BtnConsulta>
              )}

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
            </InfoContainer>
          </>
        )}
      </Main>
    </>
  );
};

export default ProductPage;
