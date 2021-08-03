import React, { useState } from 'react';
import styled from 'styled-components';
import { db, storage } from '../../components/Firebase';
import ProductsPreview from '../../components/admin/ProductsPreview';
import { desktopMediaQuery } from '../../components/Styles';

const FormContainer = styled.div`
  height: 100vh;
  position: sticky;
  top: 2vh;
  left: 0;
`;

const CategorySelector = styled.select`
  height: 5vh;
  width: 90vw;
  font-size: 1.4em;
  ${desktopMediaQuery} {
    width: 16vw;
  }
`;

const AdminDeleteProductPage = () => {
  const [category, setCategory] = useState('testcategory');
  const [reload, setReload] = useState(false);

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
    setReload(true);
    setReload(false);
  };

  const handleDeleteProduct = async (productData) => {
    let ask = window.confirm('Estas seguro que deseas eliminar "' + productData.model + '"?');
    if (ask === true) {
      //borra las imagenes del storage de firebase
      productData.imgsPath.forEach((reference) => {
        storage.ref(reference).delete();
      });

      //elimina el producto de la base de datos
      await db.collection(productData.category).doc(productData.id).delete();
      sessionStorage.clear();
      alert('Producto borrado');
      setReload(true);
      setReload(false);
    }
  };

  return (
    <FormContainer>
      <div style={{ height: '8vh', display: 'flex', flexDirection: 'column', marginLeft: '1em' }}>
        <label htmlFor="category">Category</label>
        <CategorySelector onChange={handleCategoryChange} name="category">
          <option value="testcategory">Test Category</option>
          <option value="anillos">Anillos</option>
          <option value="aros">Aros</option>
          <option value="collares">Collares</option>
          <option value="pulseras">Pulseras</option>
        </CategorySelector>
      </div>
      {reload === false && (
        <ProductsPreview category={category} reload={reload} customClick={true} onClickCallback={handleDeleteProduct} />
      )}
    </FormContainer>
  );
};

export default AdminDeleteProductPage;
