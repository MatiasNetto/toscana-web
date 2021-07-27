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

const AdminEditProductPage = () => {
  const [category, setCategory] = useState('testcategory');
  const [fillFormData, setFillFormData] = useState(undefined);
  const [reload, setReload] = useState(false);

  /*#################*/
  /*#### CHANGES ####*/
  /*#################*/

  //Cuando el input de categoria cambia actualiza el estado
  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  //Al hacer click en un producto se llama a esta funcion y setea el formulario con la data del producto enviado
  const handlePreviewCallback = (data) => {
    setFillFormData(data);
  };

  /*###################*/
  /*#### FUNCTIONS ####*/
  /*###################*/

  //Se pasan por parametros la nueva data y la vieja, se borra por completo la data del producto original y se crea uno nuevo con la data actualizada que toma su lugar en la BBDD
  const editProduct = async (modifiedData, originalData) => {
    await db.collection(originalData.category).doc(originalData.id).delete(); //Delete el producto origial
    await db.collection(modifiedData.category).doc(modifiedData.id).set(modifiedData); //Create el producto que remplaza al original
    alert('Tarea Editada');
    setReload(true);
    setReload(false);
    // window.location.reload();
    //en el input de las imagenes es necesario antes de subir nuevas eliminar las anteriores, eso se debe hacer desde el product form o creando un componente aparte para eso que seria lo mas logico
  };

  //Agrega un nuevo producto a la categoria seleccionada
  // const deleteProduct = async (productData) => {
  //   await db.collection(productData.category).doc(productData.id).delete();
  //   sessionStorage.clear();
  //   alert('Producto borrado');
  //   setReload(true);
  //   // window.location.reload();
  // };

  /*#######################*/
  /*#### DOM COMPONENT ####*/
  /*#######################*/

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
        <AdminForm onSubmitCallback={editProduct} submitName="Edit" dataToFill={fillFormData} />
        {reload === false && (
          <ProductsPreview
            category={category}
            reload={reload}
            customClick={true}
            onClickCallback={handlePreviewCallback}
          />
        )}
      </Page>
    </>
  );
};

export default AdminEditProductPage;
