import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { storage, storageBucket } from '../components/Firebase';

//assets

import uploadIMG from '../assets/buttons/Upload-BTN.png';

//styles

const Container = styled.div`
  height: 10vh;
  width: 30vw;
  width: fit-content;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #000;
`;

const FileButton = styled.img`
  height: 100%;
  width: 25%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -9;
  padding: 10px;
`;

const FileInput = styled.div`
  height: 100%;
  width: 25%;
  position: relative;
  z-index: 99;
  cursor: pointer;
  opacity: 10%;
  overflow: hidden;
`;

const TestPage = () => {
  const [filesURLs, setFilesURLs] = useState([]);

  useEffect(() => {
    console.log(filesURLs);
  });

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

  const handleUpload = async (files) => {
    const ref = storage.ref('test/');
    let imagesPaths = [];
    let imagesURLs = [];
    console.log(files);
    let totalBytesSize = 0;

    //recorre totos los archivos y va agregando a totalBytes el peso de cada uno
    for (let file of files) {
      totalBytesSize += file.size;
    }

    for (let i = 0; i < files.length; i++) {
      let uploadTask = ref.child('IMG-' + i).put(files[i]);
      imagesPaths[i] = 'test/IMG-' + i;

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / totalBytesSize) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('imagen agregada');
        }
      );
    }

    let urls = await getImgsURL(imagesPaths);
    setFilesURLs(urls);

    // let url = getImgsURL(imagesPaths).then((result) => {
    //   setFilesURLs(result);
    // });
  };

  return (
    <>
      <Container>
        <FileButton src={uploadIMG} />
        <FileInput
          as="input"
          onChange={(e) => {
            handleUpload(e.target.files);
          }}
          multiple="multiple"
          type="file"
        />
        <div>
          {filesURLs.map((url) => {
            return <img style={{ height: '10vh', width: '10vh' }} src={url} key={url} />;
          })}
        </div>

        {/* <input style={{ height: '100%', background: '#f00' }} type="file" /> */}

        {/* <button>Upload</button> */}
      </Container>
    </>
  );
};

export default TestPage;
