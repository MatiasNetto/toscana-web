import React from 'react';
import styled from 'styled-components';
import { colorBrown } from '../Styles';

const Tr = styled.tr`
  height: 15vh;
  background: ${({ dark }) => (dark ? `${colorBrown}1e` : `${colorBrown}11`)};
`;

const Td = styled.td`
  height: 15vh;
  text-align: center;
  font-size: ${({ size }) => (size ? size : `1.3em`)};
  border-bottom: 2px solid ${colorBrown};
  border-top: 2px solid ${colorBrown};
  border-collapse: collapse;
`;

const ImageContainer = styled.div`
  height: 90%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto auto;
  border-radius: 5px;
  overflow: hidden;
`;

const ModifiersContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Modifier = styled.div`
  height: auto;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px 4.5px;
  margin-bottom: 5px;
  background: ${({ color }) => color};
  border-radius: 3px;
  font-size: ${({ size }) => (size ? size : `0.7em`)};
  font-weight: 600;
  letter-spacing: 1px;
  color: #000;
  box-shadow: -3px 5px 8px #0005;
`;

const Button = styled.button`
  height: 35%;
  width: 30%;
  margin: 0 10px;
  font-size: 1em;
  background: ${({ color }) => (color ? color : `#fff`)};
  border: none;
  border-radius: 5px;
  box-shadow: 0px 5px 5px #0004;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    filter: brightness(90%);
  }
`;

const ProductRow = ({ data, dark }) => {
  console.log(dark);
  return (
    <Tr dark={dark}>
      <Td>
        <ImageContainer>
          <img style={{ width: '100%' }} src={data.imgsURL[0]} alt="" />
        </ImageContainer>
      </Td>
      <Td size="1.4em">{data.model}</Td>
      <Td>
        <strong>${data.price}</strong>
      </Td>
      <Td size="1.1em" style={{ padding: '0 20px' }}>
        {data.description.slice(0, 100)}...
      </Td>
      <Td size="1.7em">{data.order}</Td>
      <Td>
        {data.new || data.trending ? (
          <ModifiersContainer>
            {data.new && <Modifier color="#f7d249">NEW!</Modifier>}
            {data.trending && (
              <Modifier color="#a95cc3" size="0.6em">
                MAS VENDIDO!
              </Modifier>
            )}
          </ModifiersContainer>
        ) : (
          <></>
        )}
        {data.hidden || data.outOfStock ? (
          <ModifiersContainer>
            {data.hidden && <Modifier color="#777">OCULTO</Modifier>}
            {data.outOfStock && <Modifier color="#777">SIN STOCK</Modifier>}
          </ModifiersContainer>
        ) : (
          <></>
        )}
      </Td>
      <Td>
        <Button color="#00ce69">Edit</Button> <Button color="#ff3131">Delete</Button>
      </Td>
    </Tr>
  );
};

export default ProductRow;
