import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminForm from '../../components/admin/AdminForm';
import ProductsPreview from '../../components/admin/ProductsPreview';
import { db } from '../../components/Firebase';
import PageLoader from '../../components/PageLoader';

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
  const [reload, setReload] = useState(false);

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
    setReload(true);
    setReload(false);
  };

  //Agrega un nuevo producto a la categoria seleccionada
  const uploadNewProduct = async (productData) => {
    await db.collection(category).doc(productData.id).set(productData);
    alert('tarea Nueva agregada');
    setReload(true);
    setReload(false);
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
        {reload === true ? <PageLoader /> : <ProductsPreview category={category} reload={reload} />}
      </Page>
    </>
  );
};

export default AdminAddProductPage;
