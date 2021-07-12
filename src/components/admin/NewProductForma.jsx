import React, { useState } from 'react';
import { storage, storageBucket } from '../Firebase';
import styled from 'styled-components';

/*################*/
/*#### STYLES ####*/
/*################*/

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const NewProductForm = ({ uploadNewProduct }) => {
  const dataLayout = {
    id: null,
    order: '',
    model: null,
    category: 'testcategory',
    description: '',
    price: '',
    imgs: '',
    new: true,
  };
  const [productData, setProductData] = useState(dataLayout);

  //use effect cada vez que cambia el productData que se actualice el preview, llamando a una funcion pasada por props

  const resetForm = (element) => {
    //resetea los datos tanto del form como del state
    setProductData(dataLayout);
    element.reset();
  };

  //!Confuso
  const handleInputChange = (e) => {
    //guarda los campos del formulario en el estado
    let idValue;
    //si el elemento cambiado es el modelo set id como modelo, en minusculas y con "-" en vez de espacios
    //si no es asi setearlo como el valor de productData.id
    {
      e.target.name === 'model'
        ? (idValue = e.target.value.replace(/ /g, '-').toLowerCase())
        : (idValue = productData.id);
    }
    //desturcturacion de la data del evento
    let { name, value } = e.target;
    setProductData({ ...{ ...productData, [name]: value }, id: idValue }); //modifica los campos de newProductData especificados por name mas el product id
  };

  const getImgsURL = async (imagesPaths) => {
    let URLs = [];

    for (let index in imagesPaths) {
      const gsRef = storage.refFromURL(storageBucket);
      const url = await gsRef.child(imagesPaths[index]).getDownloadURL();
      URLs[index] = url;
    }

    return URLs;
  };

  const handleFilesChange = async (e) => {
    let imagesPaths = [];
    let rawFiles = e.target.files; //archivos desde fileAPI

    for (let i = 0; i < rawFiles.length; i++) {
      //recorro todos los archivos
      let ref = storage.ref(productData.category + '/' + productData.id + '/' + rawFiles[i].name); //la ruta de referencia en el sercidor para subir el archivo
      await ref.put(rawFiles[i]); //subida del archivo al servidor
      imagesPaths[i] = ref.fullPath; //guarda la ubicacion de la imagen en el indice i de la variable filespaths
    }

    let imgsURL = await getImgsURL(imagesPaths);
    setProductData({ ...productData, imgsPath: imagesPaths, imgsURL: imgsURL }); //guarda la ubicacion de la imgen en el estado
    alert('files Uploaded');
  };

  const handleSubmit = (e) => {
    //que va a realizar al darle a submit
    e.preventDefault();
    uploadNewProduct(productData); //funcion pasada por props
    resetForm(e.target);
  };

  return (
    <>
      <select onChange={handleInputChange} name="category">
        <option value="testcategory">Test Category</option>
        <option value="anillos">Anillos</option>
        <option value="aros">Aros</option>
        <option value="collares">Collares</option>
        <option value="pulseras">Pulseras</option>
      </select>
      <Form onSubmit={handleSubmit} action="">
        <label htmlFor="order">Order</label>
        <input onChange={handleInputChange} type="number" name="order" />
        <label htmlFor="model">Model</label>
        <input onChange={handleInputChange} type="text" name="model" />
        <label htmlFor="description">Description</label>
        <input onChange={handleInputChange} type="text-area" name="description" />
        <label htmlFor="price">Price</label>
        <input onChange={handleInputChange} type="number" name="price" />
        <label htmlFor="imgs">IMGS</label>
        {/* EL input upload que sea un componente que cuando agregues las imagenes se muestre el progreso */}
        <input onChange={handleFilesChange} type="file" multiple="multiple  " name="imgsURI" />
        <label htmlFor="new">New</label>
        <select onChange={handleInputChange} name="new">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <input type="submit" value="Add product" />
      </Form>
    </>
  );
};

export default NewProductForm;
