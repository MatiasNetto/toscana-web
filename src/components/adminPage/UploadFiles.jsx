import React from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';
import { colorGreen, colorRed } from '../Styles';

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999999;
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

const ButtonsContainer = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsSubContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
`;

const UploadBTN = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;

const UploadButton = styled.button`
  height: 6vh;
  width: 6vh;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border-radius: 5px;
  border: 2px solid #000d;
  color: #000d;
  cursor: pointer;
`;

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
  font-size: 1.3em;
  padding: 5px 20px;
  background: ${({ color }) => (color ? `${color}` : `transparent`)};
  border: 2px solid ${({ color }) => (color ? color : `#0005`)};
  border-radius: 5px;
  cursor: pointer;
`;

const UploadFiles = () => {
  return reactDom.createPortal(
    <BackgroundContainer>
      <Container>
        <Tittle>Upload a file</Tittle>
        <FilesContainer>
          <p>file</p>
          <p>file</p>
        </FilesContainer>
        <ButtonsContainer>
          <UploadBTN>
            <UploadButton>
              <i className="fas fa-upload"></i>
            </UploadButton>
            <UploadInput type="file" multiple="multiple" name="imgsURL" />
          </UploadBTN>
          <ButtonsSubContainer>
            <Button color={colorRed}>Cancel</Button>
            <Button color={colorGreen}>Guardar</Button>
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
