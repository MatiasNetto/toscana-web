import React, { useState } from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';
import Form from '../../components/adminPage/Form';

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0008;
  backdrop-filter: blur(3px);
`;

const MainContainer = styled.div`
  height: 95%;
  width: 60%;
  padding: 1.5vw;
  background: #fff;
  border-radius: 5px;
`;

const FormModal = ({ dataToFill, category }) => {
  const dataLayout = {
    id: '',
    order: 5,
    model: '',
    category: category,
    description: '',
    price: '',
    imgsPath: '',
    thubnailIMG: '',
    imgsURL: '',
    new: true,
    trending: false,
    outOfStock: false,
    offer: false,
    hidden: false,
  };
  const defaultData = dataToFill ? dataToFill : dataLayout;

  const [productData, setProductData] = useState(defaultData);

  return reactDom.createPortal(
    <>
      <BackgroundContainer>
        <MainContainer>
          <Form productData={productData} setProductData={setProductData} handleSubmit="" submitText="Guardar"></Form>
        </MainContainer>
      </BackgroundContainer>
    </>,
    document.getElementById('form-modal')
  );
};

export default FormModal;
