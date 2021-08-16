import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../auth/AuthContext';
import { colorGreen, colorRed } from '../Styles';
import UploadFiles from './UploadFiles';

const FormStyle = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GridContainer = styled.div`
  height: 70%;
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-auto-rows: repeat(5, 1fr);
  grid-row-gap: 3vh;
  align-items: center;
`;

const Tittle = styled.h4`
  display: flex;
  align-items: center;
  background: #0042;
  padding: 5px;
`;

const CategoryInput = styled.select`
  margin-left: 1em;
  background: transparent;
  border: none;
  font-size: 1.3em;
  cursor: pointer;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  padding: 0 10px;
  color: #000;
`;

const TextInput = styled.input`
  width: 80%;
  height: 5vh;
  font-size: 1.2em;
`;

const NumberInput = styled(TextInput)`
  width: 80%;
  font-size: 1.4em;
`;

const AreaInput = styled.textarea`
  width: 80%;
  height: 15vh;
  font-size: 1.2em;
`;

const SelectInput = styled.select`
  width: 80%;
  height: 5vh;
  font-size: 1.4em;
`;

const UploadImageButton = styled.button`
  height: fit-content;
  width: fit-content;
  margin: auto 0;
  cursor: pointer;
`;

const UploadImageIcon = styled.i`
  padding: 3vh;
  font-size: 2.5em;
`;

const TagsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 6%;
`;

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckInput = styled.input`
  height: 1.2em;
  width: 1.2em;
  margin-right: 5px;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ButtonInput = styled.input`
  width: 45%;
  height: 6vh;
  background: ${({ color }) => (color ? color : `#f00`)};
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
`;

const ImagePreview = styled.div`
  height: 100%;
  width: 10vh;
  background: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  margin-left: 3vh;
`;

const Form = ({ status, productData, setProductData, category, setCategory, setOpenForm, handleSubmit }) => {
  const [openUploadFiles, setOpenUploadFiles] = useState(false);
  const { currentUser } = useAuth();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let idValue;

    //en caso de que el campo modificado sea el modelo, actualizar tambien el ID
    if (name === 'model') idValue = e.target.value.replace(/ /g, '-').toLowerCase();

    //set del productData con el campo y valor modificado y, en el caso de que idValue tenga valor, setea el value como tal, en casod e que no lo deja igual
    setProductData({ ...{ ...productData, [name]: value }, id: idValue ? idValue : productData.id });
  };

  const handleCheckboxChange = (e) => {
    //maneja el completado de datos para las checkboxes
    let { name, checked } = e.target;
    setProductData({ ...productData, [name]: checked }); //modifica el campo de newProductData especificado por name
  };

  const handleCancel = () => {
    setOpenForm(false);
  };

  const handleUploadFilesClick = (e) => {
    e.preventDefault();
    setOpenUploadFiles(true);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit} action="">
        {/* ******* */}
        {/* PRODUCT */}
        {/* ******* */}
        <Tittle>
          Producto:
          <CategoryInput value={category} onChange={handleCategoryChange}>
            <option value="anillos">Anillo</option>
            <option value="aros">Aro</option>
            <option value="collares">Collar</option>
            <option value="pulseras">Pulsera</option>
            <option value="relojes">Reloj</option>
            {currentUser.email === 'admin@admin.com' && <option value="testcategory">Test</option>}
          </CategoryInput>
        </Tittle>
        <GridContainer>
          {/* MODEL */}
          <Label htmlFor="model">Model</Label>
          <TextInput value={productData.model} onChange={handleInputChange} type="text" name="model" />

          {/* DESCRIPTION */}
          <Label htmlFor="description">Description</Label>
          <AreaInput value={productData.description} onChange={handleInputChange} type="text-area" name="description" />

          {/* PRICE */}
          <Label htmlFor="price">Price</Label>
          <NumberInput value={productData.price} onChange={handleInputChange} type="number" name="price" />

          {/* IMGS */}
          <Label htmlFor="imgs">IMGS</Label>
          {/* EL input upload que sea un componente que cuando agregues las imagenes se muestre el progreso */}
          <div style={{ display: 'flex', height: '11vh', overflow: 'auto' }}>
            <UploadImageButton onClick={handleUploadFilesClick}>
              <UploadImageIcon className="fas fa-cloud-upload-alt"></UploadImageIcon>
            </UploadImageButton>
            {productData.imgsURL !== '' && productData.imgsURL.map((url) => <ImagePreview src={url} />)}
          </div>

          {/* ORDER */}
          <Label htmlFor="order">Relevance</Label>
          <SelectInput value={productData.order} onChange={handleInputChange} name="order">
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </SelectInput>
        </GridContainer>

        {/* **** */}
        {/* TAGS */}
        {/* **** */}
        <Tittle>Tags</Tittle>
        <TagsContainer>
          <CheckContainer>
            {/* NEW */}
            <CheckInput
              type="checkbox"
              // defaultChecked="true"
              checked={productData.new}
              onChange={handleCheckboxChange}
              name="new"
            />
            <Label htmlFor="new">New</Label>
          </CheckContainer>

          {/* TRENDING */}
          <CheckContainer>
            <CheckInput
              type="checkbox"
              checked={productData.trending}
              onChange={handleCheckboxChange}
              name="trending"
            />
            <Label htmlFor="trending">Trending</Label>
          </CheckContainer>

          {/* OUT OF STOCK */}
          <CheckContainer>
            <CheckInput
              type="checkbox"
              checked={productData.outOfStock}
              onChange={handleCheckboxChange}
              name="outOfStock"
            />
            <Label htmlFor="outOfStock">Sin Stock</Label>
          </CheckContainer>

          {/* OFFER */}
          {/* <div>
          <CheckInput
            type="checkbox"
            onChange={handleCheckboxChange}
            name="offer"
          />
          <Label htmlFor="offer">Oferta</Label>
        </div> */}

          {/* OUT OF STOCK */}
          <CheckContainer>
            <CheckInput type="checkbox" checked={productData.hidden} onChange={handleCheckboxChange} name="hidden" />
            <Label htmlFor="hidden">Oculto</Label>
          </CheckContainer>
        </TagsContainer>

        <ButtonsContainer style={{ display: 'flex' }}>
          <ButtonInput type="button" value="Cancelar" color={colorRed} onClick={handleCancel} />
          <ButtonInput
            type="submit"
            value={status === null ? 'Guardar' : status === 'uploading' ? 'Guardando...' : 'Guardado!'}
            color={colorGreen}
          />
        </ButtonsContainer>
      </FormStyle>

      {openUploadFiles && (
        <UploadFiles
          productData={productData}
          setProductData={setProductData}
          setOpenUploadFiles={setOpenUploadFiles}
        />
      )}
    </>
  );
};

export default Form;
