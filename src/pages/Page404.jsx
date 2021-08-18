import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//assets
import image404 from '../assets/404-IMG.png';
import { desktopMediaQuery } from '../components/Styles';

const Container = styled.div`
  height: 92vh;
  margin-top: 8vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10vh 0;
`;

const Image = styled.img`
  width: 45%;

  ${desktopMediaQuery} {
    width: 15%;
  }
`;

const Tittle = styled.h2`
  font-size: 2em;
  text-align: center;

  ${desktopMediaQuery} {
    font-size: 3em;
  }
`;

const Subtittle = styled.h3`
  font-size: 1em;
  font-weight: 200;
  text-align: center;
  margin-top: 20px;

  ${desktopMediaQuery} {
    font-size: 1.2em;
  }
`;

const Button = styled(Link)`
  height: 8vh;
  width: 80vw;
  font-size: 1.7em;
  background: #00ce69;
  border: none;
  outline: none;
  cursor: pointer;

  color: #fff;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: background 0.3s;

  &:hover {
    background: #00be59;
  }

  ${desktopMediaQuery} {
    height: 8vh;
    width: 30vw;
  }
`;

const Page404 = () => {
  return (
    <Container>
      <Image src={image404} />
      <div>
        <Tittle>PAGINA NO DISPONIBLE</Tittle>
        <Subtittle>Lo sentimos, la direccion deseada no se encuentra disponible</Subtittle>
      </div>

      <Button to="/">
        <span style={{ marginRight: '10px' }}>&lt;</span>Pagina de inico
      </Button>
    </Container>
  );
};

export default Page404;
