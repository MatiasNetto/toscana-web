import React, { useState } from 'react';
import styled from 'styled-components';
import NewProductForm from '../../components/admin/NewProductForma';
import ProductsPreview from '../../components/admin/ProductsPreview';
import { db } from '../../components/Firebase';

/*################*/
/*#### STYLES ####*/
/*################*/
import { desktopMediaQuery } from '../../components/Styles';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  ${desktopMediaQuery} {
    flex-direction: row;
    border: 2px solid #f00;
  }
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const AdminAddProductPage = () => {
  const [category, setCategory] = useState('testcategory');

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  //Agrega un nuevo producto a la categoria seleccionada
  const uploadNewProduct = async (productData) => {
    await db.collection(productData.category).doc(productData.id).set(productData);
    alert('tarea Nueva agregada');
    window.location.reload();
  };

  return (
    <>
      <select onChange={handleCategoryChange} name="category">
        <option value="testcategory">Test Category</option>
        <option value="anillos">Anillos</option>
        <option value="aros">Aros</option>
        <option value="collares">Collares</option>
        <option value="pulseras">Pulseras</option>
      </select>
      <Page>
        <NewProductForm category={category} onSubmitCallback={uploadNewProduct} />
        <ProductsPreview category={category} />
      </Page>
    </>
  );
};

export default AdminAddProductPage;
