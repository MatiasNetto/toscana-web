import React, { useEffect, useState } from 'react';
import reactDom from 'react-dom';
import { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import { storageBucket, storage } from '../Firebase';
import { colorGreen, colorRed } from '../Styles';
import FileInput from './FileInput';

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0008;
  backdrop-filter: blur(3px);
`;

const Container = styled.div`
  height: 70%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3vh;
  background: #fff;
  border-radius: 5px;
`;

const Tittle = styled.h4`
  font-size: 2.3em;
  text-align: center;
`;

const FilesContainer = styled.div`
  height: 70%;
  width: 100%;
  overflow: auto;
`;

const FilesContainerActive = {
  background: '#55f4',
};

const FilesMessageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 2em;
  border: 3px dashed #aaa;
`;

const ButtonsContainer = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsSubContainer = styled.div`
  width: 58%;
  display: flex;
  justify-content: space-between;
`;

const UploadBTN = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;

// const UploadButton = styled.button`
//   font-size: 1.2em;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 5px;
//   background: transparent;
//   border-radius: 5px;
//   border: 2px solid #000d;
//   color: #000d;
//   cursor: pointer;
// `;

const UploadInput = styled.input`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
`;

const Button = styled.button`
  height: 5vh;
  width: fit-content;
  font-size: ${({ status }) => (status === 'uploading' || status === 'uploaded' ? `1.1em` : `1.3em`)};
  padding: 5px 20px;
  background: ${({ color }) => (color ? `${color}` : `transparent`)};
  border: 2px solid ${({ color }) => (color ? color : `#0005`)};
  border-radius: 5px;
  cursor: pointer;

  transition: filter 0.3s;

  &:hover {
    filter: brightness(90%);
  }
`;

const UploadFiles = ({ productData, setProductData, setOpenUploadFiles }) => {
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState(null);
  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    noClick: images === null ? false : true,
    onDrop: (acceptedFiles) => {
      console.log([...acceptedFiles]);
      if (images === null) setImages([...acceptedFiles]);
      else setImages([...images, ...acceptedFiles]);
    },
  });

  useEffect(() => {
    //en caso de que el array este vacio, establecerlo como null
    console.log('object');
    if (!images?.length) setImages(null);
  }, [images]);

  const handleCancel = () => {
    setOpenUploadFiles(false);
  };

  /**********************/
  /**** ModifyImages ****/
  /**********************/

  const changeImageIndex = (elementToReposition, direction) => {
    let newIndex;
    let arrayToUpdate = images;

    //si es para arriba set el nuevo indice como uno menos del actual, en caso de ser para abajo hacer lo contrario
    if (direction === 'up') newIndex = images.indexOf(elementToReposition) - 1;
    if (direction === 'down') newIndex = images.indexOf(elementToReposition) + 1;

    //prevenir en caso de que el nuevo indice sea -1 y en caso de que el nuevo indice sea mayor al largo del aray
    if (newIndex === -1) newIndex = 0;
    if (newIndex === arrayToUpdate.length) newIndex = arrayToUpdate.length - 1;

    //elimina el elemento a reposicionar
    arrayToUpdate.splice(images.indexOf(elementToReposition), 1);

    //separa lo que va a ir antes y lo que va a ir despues del nuevo array
    let before = arrayToUpdate.slice(0, newIndex);
    let after = arrayToUpdate.slice(before.length, arrayToUpdate.length);

    //set del nuevo array
    setImages([...before, elementToReposition, ...after]);
  };

  const deleteImageIndex = (elementToDelete) => {
    let arrayToUpdate = images;

    //elimina el elemento selecionado
    arrayToUpdate.splice(images.indexOf(elementToDelete), 1);

    console.log(arrayToUpdate);

    setImages([...arrayToUpdate]);
  };

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

  /*****************/
  /**** Changes ****/
  /*****************/

  const handleFilesChange = (e) => {
    let rawFiles = e.target.files; //archivos desde fileAPI
    let files = [];
    for (let i = 0; i < rawFiles.length; i++) {
      files[i] = rawFiles.item(i);
    }
    // setImages(files);
    if (images === null) setImages(files);
    else setImages([...images, ...files]);
    console.log(files);
  };

  const handleUploadFiles = async () => {
    if (!images || images.length === 0) {
      alert('Necesitas elegir una imagen para subir');
      return false;
    }
    setStatus('uploading');
    const UUID = Date.now();
    let imagesPaths = [];
    for (let i = 0; i < images.length; i++) {
      let ref = storage.ref(productData.category + '/' + productData.id + '-' + UUID + '/IMG-' + i); //la ruta de referencia en el sercidor para subir el archivo
      await ref.put(images[i]); //subida del archivo al servidor
      imagesPaths[i] = ref.fullPath; //guarda la ubicacion de la imagen en el indice i de la variable filespaths
    }

    //Genera las URLs y guarda la data en el estado
    let imgsURL = await getImgsURL(imagesPaths); //genera las direcciones URL de las imagenes con los paths y las devuelve a imgsURL
    setProductData({ ...productData, imgsPath: imagesPaths, imgsURL: imgsURL }); //guarda los paths y las URLs de las imgenes en el estado
    setStatus('uploaded');

    setTimeout(() => {
      setOpenUploadFiles(false);
    }, 1000);
  };

  return reactDom.createPortal(
    <BackgroundContainer>
      <Container>
        <Tittle>Upload a file</Tittle>
        <FilesContainer style={isDragActive ? FilesContainerActive : {}} {...getRootProps()}>
          <input {...getInputProps()} />
          {images ? (
            images.map((data) => {
              return (
                <FileInput
                  key={data.name}
                  data={data}
                  changeImageIndex={changeImageIndex}
                  deleteImageIndex={deleteImageIndex}
                />
              );
            })
          ) : (
            <FilesMessageContainer>
              <>
                <i className="fas fa-cloud-upload-alt"></i>
                <p>{isDragActive ? 'Drop the file' : 'Drag a file'}</p>
              </>
            </FilesMessageContainer>
          )}
        </FilesContainer>
        <ButtonsContainer>
          <UploadBTN>
            <Button color="#5e82ea">
              Upload
              <i style={{ marginLeft: '10px' }} className="fas fa-upload"></i>
            </Button>
            <UploadInput onChange={handleFilesChange} type="file" multiple="multiple" name="imgsURL" />
          </UploadBTN>
          <ButtonsSubContainer>
            <Button onClick={handleCancel} color={colorRed}>
              Cancel
            </Button>
            <Button onClick={handleUploadFiles} color={colorGreen} status={status}>
              {status === null && 'Upload'}
              {status === 'uploading' && 'Uploading...'}
              {status === 'uploaded' && 'Uploaded!'}
            </Button>
          </ButtonsSubContainer>
        </ButtonsContainer>
      </Container>
    </BackgroundContainer>,
    document.getElementById('upload-files-modal')
  );

  //   return (
  //     <>
  //       <UploadBTN>
  //         <UploadButton>Upload a file</UploadButton>
  //         <UploadInput type="file" multiple="multiple" name="imgsURL" />
  //       </UploadBTN>
  //     </>
  //   );
};

export default UploadFiles;
