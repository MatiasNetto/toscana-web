import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../auth/AuthContext';
import AdminForm from '../../components/admin/AdminForm';
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
  position: sticky;
  top: 2vh;
  left: 0;
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

const AdminAddProductPage = () => {
  const [category, setCategory] = useState('anillos');
  const [reload, setReload] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

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
          <AdminForm
            onSubmitCallback={uploadNewProduct}
            submitName="Add Product"
            deleteCallback={undefined}
            dataToFill={undefined}
            category={category}
          />
        </FormContainer>
      </Page>
    </>
  );
};

export default AdminAddProductPage;
