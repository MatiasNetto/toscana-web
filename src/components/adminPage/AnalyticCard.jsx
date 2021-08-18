import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 20%;
  height: 20vh;
  display: flex;
  padding: 1em;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 5px 5px #0004;
`;

const DataContainer = styled.div`
  height: 70%;
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const Tittle = styled.h6`
  font-size: 1.3em;
  color: #0006;
`;

const Amount = styled.p`
  margin-top: 0.3em;
  font-size: 2em;
`;

const Icon = styled.i`
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  /* width: 100%; */
`;

const AnalyticCard = ({ tittle, amount, iconClassName }) => {
  return (
    <>
      <Container>
        <DataContainer>
          <Tittle>{tittle}</Tittle>
          <Amount>{amount ? amount : amount === 0 ? '0' : '...'}</Amount>
        </DataContainer>
        <Icon className={iconClassName}></Icon>
      </Container>
    </>
  );
};

export default AnalyticCard;
