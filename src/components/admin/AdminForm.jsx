import React, { useEffect, useState } from 'react';
import { storage, storageBucket } from '../Firebase';
import styled from 'styled-components';
import { desktopMediaQuery } from '../Styles';

/*################*/
/*#### STYLES ####*/
/*################*/

const MainContainer = styled.div`
  height: 90%;
  width: 100%;
  padding: 1em 1em;

  ${desktopMediaQuery} {
    width: 18vw;
  }
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #000;
`;

const TextInput = styled.input`
  height: 5vh;
  font-size: 1.2em;
`;

const NumberInput = styled(TextInput)`
  font-size: 1.4em;
`;

const AreaInput = styled.textarea`
  height: 15vh;
  font-size: 1.2em;
`;

const SelectInput = styled.select`
  height: 5vh;
  font-size: 1.4em;
`;

const CheckInput = styled.input`
  height: 1.2em;
  width: 1.2em;
  margin-right: 5px;
  cursor: pointer;
`;

const ButtonInput = styled.input`
  width: 100%;
  height: 6vh;
  background: #00ce69;
  font-size: 1.2em;
  cursor: pointer;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const AdminForm = ({ onSubmitCallback, submitName, dataToFill, category }) => {
  const dataLayout = {
    id: '',
    order: 5,
    model: '',
    category: category,
    description: '',
    price: '',
    imgsPath: '',
    imgsURL: '',
    new: true,
    trending: false,
    outOfStock: false,
    offer: false,
    hidden: false,
  };

  const [productData, setProductData] = useState(dataLayout);
  const [originalProductData, setOriginalProductData] = useState(undefined);

  /*#########################*/
  /*#### FORM OPERATIONS ####*/
  /*#########################*/

  //Rellena el form con la data pasada por props al cambiar la prop "dataToFIll"
  useEffect(() => {
    fillForm(dataToFill);
  }, [dataToFill]);

  //al cambiar la categoria pasada por props actualiza el productData con la nueva categoria
  useEffect(() => {
    setProductData({ ...{ ...productData, category: category } });
  }, [category]);

  //Rellena el form y originalProductData con los datos indicados
  const fillForm = (data) => {
    if (dataToFill !== undefined) {
      setProductData(dataToFill);
      setOriginalProductData(dataToFill);
    }
  };

  //Borra los datos tanto del form como del state
  const clearForm = (element) => {
    setProductData(dataLayout);
    element.reset();
  };

  /*##############*/
  /*#### MISC ####*/
  /*##############*/

  //Convierte los paths en URLs y las devuelve en forma de array
  const getImgsURL = async (imagesPaths) => {
    let URLs = [];

    for (let index in imagesPaths) {
      //Recorre y genera la URL para cada path
      const gsRef = storage.refFromURL(storageBucket);
      const url = await gsRef.child(imagesPaths[index]).getDownloadURL();
      URLs[index] = url;
    }
    return URLs;
  };

  /*#################*/
  /*#### CHANGES ####*/
  /*#################*/

  //Al cambiar un valor del form lo guarda en el estado
  const handleInputChange = (e) => {
    let idValue;

    //si el elemento modificado es el modelo set id como modelo con formato especial. Si no es asi lo deja con el vlor aterior (Valor de productData.id)
    if (e.target.name === 'model') {
      idValue = e.target.value.replace(/ /g, '-').toLowerCase(); //  en minusculas y con "-" en vez de espacios
    } else {
      idValue = productData.id;
    }
    //desturcturacion de la data del evento
    let { name, value } = e.target;
    setProductData({ ...{ ...productData, [name]: value }, id: idValue }); //modifica los campos de newProductData especificados por name mas el product id
  };

  //maneja el completado de datos para las checkboxes
  const handleCheckboxChange = (e) => {
    //destructura el nombre y el valor del checkbox
    let { name, checked } = e.target;
    setProductData({ ...productData, [name]: checked }); //modifica el campo de newProductData especificado por name
  };

  //Al agregarse archivos de imagen estos son subidos al servidor, guardados los paths y guardadas las URLs generadas
  const handleFilesChange = async (e) => {
    let imagesPaths = [];
    let rawFiles = e.target.files; //archivos desde fileAPI

    for (let i = 0; i < rawFiles.length; i++) {
      //recorro todos los archivos
      let ref = storage.ref(productData.category + '/' + productData.id + '/' + rawFiles[i].name); //la ruta de referencia en el sercidor para subir el archivo
      await ref.put(rawFiles[i]); //subida del archivo al servidor
      imagesPaths[i] = ref.fullPath; //guarda la ubicacion de la imagen en el indice i de la variable filespaths
    }

    //Genera las URLs y guarda la data en el estado
    let imgsURL = await getImgsURL(imagesPaths); //genera las direcciones URL de las imagenes con los paths y las devuelve a imgsURL
    setProductData({ ...productData, imgsPath: imagesPaths, imgsURL: imgsURL }); //guarda los paths y las URLs de las imgenes en el estado
    alert('files Uploaded');
  };

  /*#########################*/
  /*#### CLICK FUNCTIONS ####*/
  /*#########################*/

  //Previene el envio y ejecuta la funcion por props para el submit
  const handleSubmit = (e) => {
    //que va a realizar al darle a submit
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
      onSubmitCallback(productData, originalProductData); //funcion pasada por props
      clearForm(e.target); //se puede directamente resetear el navegador
    } else {
      alert('Complete todos los campos');
    }
  };

  /*#######################*/
  /*#### DOM COMPONENT ####*/
  /*#######################*/

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit} action="">
        {/* MODEL */}
        <InputContainer>
          <Label htmlFor="model">Model</Label>
          <TextInput value={productData.model} onChange={handleInputChange} type="text" name="model" />
        </InputContainer>

        {/* DESCRIPTION */}
        <InputContainer>
          <Label htmlFor="description">Description</Label>
          <AreaInput value={productData.description} onChange={handleInputChange} type="text-area" name="description" />
        </InputContainer>

        <div style={{ display: 'flex' }}>
          {/* PRICE */}
          <InputContainer style={{ width: '50%' }}>
            <Label htmlFor="price">Price</Label>
            <NumberInput value={productData.price} onChange={handleInputChange} type="number" name="price" />
          </InputContainer>

          {/* ORDER */}
          <InputContainer style={{ width: '50%' }}>
            <Label htmlFor="order">Relevance</Label>
            {/* <TextInput value={productData.order} onChange={handleInputChange} type="number" name="order" /> */}
            <SelectInput value={productData.order} onChange={handleInputChange} name="order">
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </SelectInput>
          </InputContainer>
        </div>

        {/* IMGS */}
        <InputContainer>
          <Label htmlFor="imgs">IMGS</Label>
          {/* EL input upload que sea un componente que cuando agregues las imagenes se muestre el progreso */}
          <input onChange={handleFilesChange} type="file" multiple="multiple  " name="imgsURI" />
        </InputContainer>

        {/* ********* */}
        {/* MODIFIERS */}
        {/* ********* */}
        <div>
          {/* NEW */}
          <CheckInput
            type="checkbox"
            // defaultChecked="true"
            checked={productData.new}
            onChange={handleCheckboxChange}
            name="new"
          />
          <Label htmlFor="new">New</Label>
        </div>

        {/* TRENDING */}
        <div>
          <CheckInput type="checkbox" checked={productData.trending} onChange={handleCheckboxChange} name="trending" />
          <Label htmlFor="trending">Trending</Label>
        </div>

        {/* OUT OF STOCK */}
        <div>
          <CheckInput
            type="checkbox"
            checked={productData.outOfStock}
            onChange={handleCheckboxChange}
            name="outOfStock"
          />
          <Label htmlFor="outOfStock">Sin Stock</Label>
        </div>

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
        <div>
          <CheckInput type="checkbox" checked={productData.hidden} onChange={handleCheckboxChange} name="hidden" />
          <Label htmlFor="hidden">Oculto</Label>
        </div>

        <ButtonInput type="submit" value={submitName} />
      </Form>
    </MainContainer>
  );
};

export default AdminForm;
