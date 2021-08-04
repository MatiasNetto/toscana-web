import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../auth/AuthContext';
import AdminForm from '../../components/admin/AdminForm';
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

const FormContainer = styled.div`
  height: 100vh;
  position: relative;

  ${desktopMediaQuery} {
    position: sticky;
    top: 2vh;
    left: 0;
  }
`;

const CategorySelector = styled.select`
  height: 5vh;
  width: 90vw;
  font-size: 1.4em;
  cursor: pointer;
  ${desktopMediaQuery} {
    width: 16vw;
  }
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const AdminEditProductPage = () => {
  const [category, setCategory] = useState('anillos');
  const [fillFormData, setFillFormData] = useState(undefined);
  const [reload, setReload] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  /*#################*/
  /*#### CHANGES ####*/
  /*#################*/

  //Cuando el input de categoria cambia actualiza el estado
  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setReload(true);
    setReload(false);
    setCategory(e.target.value);
    console.log('reload');
  };

  //Al hacer click en un producto se llama a esta funcion y setea el formulario con la data del producto enviado
  const handlePreviewCallback = (data) => {
    setFillFormData(data);
    if (window.innerWidth <= 996) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
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

  /*#######################*/
  /*#### DOM COMPONENT ####*/
  /*#######################*/

  return (
    <>
      <Page>
        <FormContainer>
          <div style={{ height: '8vh', display: 'flex', flexDirection: 'column', marginLeft: '1em' }}>
            <label htmlFor="category">Category</label>
            <CategorySelector onChange={handleCategoryChange} name="category">
              <option value="anillos">Anillos</option>
              <option value="aros">Aros</option>
              <option value="collares">Collares</option>
              <option value="pulseras">Pulseras</option>
              {currentUser.email === 'admin@admin.com' && <option value="testcategory">Test</option>}
            </CategorySelector>
          </div>
          <AdminForm onSubmitCallback={editProduct} submitName="Edit" dataToFill={fillFormData} />
        </FormContainer>

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
