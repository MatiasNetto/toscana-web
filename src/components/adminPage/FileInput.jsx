import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colorRed } from '../Styles';

const Container = styled.div`
  height: 12vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vh;
  border-bottom: 1px solid #0014;
  overflow: hidden;
`;

const Image = styled.div`
  height: 10vh;
  width: 10vh;
  /* border-radius: 5px; */
  border-radius: 100%;
  overflow: hidden;
  background: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

const FileName = styled.h5`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  padding-left: 5%;
  font-size: 1.3em;
  font-weight: 200;
  overflow: hidden;
  /* border: 1px solid #f00; */
`;

const ButtonsContainer = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 20px;
`;

const OrderButton = styled.button`
  height: 30%;
  width: 100%;
  background: #0001;
  border: none;
  border-radius: 5px;
  font-size: 1.4em;
  cursor: pointer;

  &:hover {
    background: #0002;
  }

  transform: rotate(${({ down }) => (down ? `180deg` : `0deg`)});
`;

const DeleteButton = styled.button`
  height: 40%;
  width: 10%;
  padding: 10px;
  background: transparent;
  border: none;
  font-size: 1.6em;
  color: ${colorRed};
  cursor: pointer;

  &:hover {
    filter: brightness(80%);
  }
`;

const FileInput = ({ data, changeImageIndex, deleteImageIndex }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = (e) => {
      let dataURL = reader.result;
      setImage(dataURL);
    };
    reader.readAsDataURL(data);
  });

  const handleUp = () => {
    changeImageIndex(data, 'up');
  };

  const handleDown = () => {
    changeImageIndex(data, 'down');
  };

  const handleDelete = () => {
    deleteImageIndex(data);
  };

  return (
    <>
      <Container>
        <ButtonsContainer>
          <OrderButton onClick={handleUp}>
            <i className="fas fa-chevron-up"></i>
          </OrderButton>
          <OrderButton down onClick={handleDown}>
            <i className="fas fa-chevron-up"></i>
          </OrderButton>
        </ButtonsContainer>
        {image && <Image src={image} />}
        <FileName>{data.name}</FileName>
        <DeleteButton onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i>
        </DeleteButton>
      </Container>
    </>
  );
};

export default FileInput;
