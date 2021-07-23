import React, { useState } from 'react';
import styled from 'styled-components';
import AdminForm from '../../components/admin/AdminForm';
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
    await db.collection(category).doc(productData.id).set(productData);
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
        <AdminForm
          onSubmitCallback={uploadNewProduct}
          submitName="Add Product"
          deleteCallback={undefined}
          dataToFill={undefined}
          category={category}
        />
        <ProductsPreview category={category} />
      </Page>
    </>
  );
};

export default AdminAddProductPage;
