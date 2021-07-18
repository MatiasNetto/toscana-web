import React, { useEffect, useState } from 'react';
import { storage, storageBucket } from '../Firebase';
import styled from 'styled-components';

/*################*/
/*#### STYLES ####*/
/*################*/

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonsGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonInput = styled.input`
  width: 100%;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const AdminForm = ({ onSubmitCallback, submitName, deleteCallback, dataToFill }) => {
  const dataLayout = {
    id: '',
    order: '',
    model: '',
    category: 'testcategory',
    description: '',
    price: '',
    imgsPath: '',
    imgsURL: '',
    new: true,
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
    onSubmitCallback(productData, originalProductData); //funcion pasada por props
    clearForm(e.target); //se puede directamente resetear el navegador
  };

  const handleDeleteClick = () => {
    deleteCallback(originalProductData); //se pasa la data original del producto para atravez de esta eliminar el documento
  };

  /*#######################*/
  /*#### DOM COMPONENT ####*/
  /*#######################*/

  return (
    <div>
      <Form onSubmit={handleSubmit} action="">
        {/* ORDER */}
        <label htmlFor="order">Order</label>
        <input value={productData.order} onChange={handleInputChange} type="number" name="order" />

        {/* MODEL */}
        <label htmlFor="model">Model</label>
        <input value={productData.model} onChange={handleInputChange} type="text" name="model" />

        {/* DESCRIPTION */}
        <label htmlFor="description">Description</label>
        <textarea value={productData.description} onChange={handleInputChange} type="text-area" name="description" />

        {/* PRICE */}
        <label htmlFor="price">Price</label>
        <input value={productData.price} onChange={handleInputChange} type="number" name="price" />

        {/* IMGS */}
        <label htmlFor="imgs">IMGS</label>
        {/* EL input upload que sea un componente que cuando agregues las imagenes se muestre el progreso */}
        <input onChange={handleFilesChange} type="file" multiple="multiple  " name="imgsURI" />

        {/* NEW */}
        <label htmlFor="new">New</label>
        <select defaultValue={productData.new} onChange={handleInputChange} name="new">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>

        {/* BUTTONS */}
        <ButtonsGrid>
          <ButtonInput type="submit" value={submitName} />
          {deleteCallback !== undefined && <ButtonInput type="button" value="Delete" onClick={handleDeleteClick} />}
        </ButtonsGrid>
      </Form>
    </div>
  );
};

export default AdminForm;
