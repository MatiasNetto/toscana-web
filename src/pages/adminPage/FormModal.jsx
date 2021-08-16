import React, { useState } from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';
import Form from '../../components/adminPage/Form';
import { db } from '../../components/Firebase';

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
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

const FormModal = ({ dataToFill, category, setCategory, setOpenForm, setReloadProductsTable }) => {
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
  const [status, setStatus] = useState(null);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    let d = productData;
    if (
      d.id !== '' &&
      d.order !== '' &&
      d.model !== '' &&
      d.description !== '' &&
      d.price !== '' &&
      d.imgsPath !== '' &&
      e.imgsURL !== ''
    ) {
      setStatus('uploading');
      await db.collection(category).doc(productData.id).set(productData);
      setStatus('uploaded');
      setTimeout(() => {
        setOpenForm(false);
        setReloadProductsTable(true);
        setReloadProductsTable(false);
      }, 1000);
    } else {
      alert('Complete todos los campos');
    }
  };

  return reactDom.createPortal(
    <>
      <BackgroundContainer>
        <MainContainer>
          <Form
            status={status}
            productData={productData}
            setProductData={setProductData}
            category={category}
            setCategory={setCategory}
            setOpenForm={setOpenForm}
            handleSubmit={handleAddProduct}
          ></Form>
        </MainContainer>
      </BackgroundContainer>
    </>,
    document.getElementById('form-modal')
  );
};

export default FormModal;
