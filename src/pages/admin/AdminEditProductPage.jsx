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

const AdminEditProductPage = () => {
  const [category, setCategory] = useState('testcategory');
  const [fillFormData, setFillFormData] = useState(undefined);

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  const editProduct = async (productData) => {
    //comunicarse con la base de datos y modificar el producto
    //en el input de las imagenes es necesario antes de subir nuevas eliminar las anteriores, eso se debe hacer desde el product form o creando un componente aparte para eso que seria lo mas logico
  };

  //Agrega un nuevo producto a la categoria seleccionada
  const deleteProduct = async (productData) => {
    await db.collection(productData.category).doc(productData.id).set(productData);
    alert('tarea Nueva agregada');
    window.location.reload();
  };

  const handleFillForm = (data) => {
    setFillFormData(data);
    window.scrollTo(0, 0);
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
        <NewProductForm
          category={category}
          onSubmitCallback={'edita el elemento'}
          submitButtonName="edit"
          secondButtonName="Delete"
          secondButtonCallback={'Borra el elemento'}
          fillFormData={fillFormData}
        />
        <ProductsPreview category={category} onClickCallback={handleFillForm} />
      </Page>
    </>
  );
};

export default AdminEditProductPage;
