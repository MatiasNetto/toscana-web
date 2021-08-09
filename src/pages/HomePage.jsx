import React from 'react';
import styled from 'styled-components';

//assets
import arosImage from '../assets/categorys/Aros.jpeg';
import anillosImage from '../assets/categorys/Anillo.png';
import collaresImage from '../assets/categorys/Collar.jpeg';
import pulserasImage from '../assets/categorys/Pulsera.jpeg';
import relojesImage from '../assets/categorys/Reloj.jpeg';

//components
import CategoryCard from '../components/CategoryCard';

/*################*/
/*#### STYLES ####*/
/*################*/
import { desktopMediaQuery, Subtittle } from '../components/Styles';
import HomePageSlider from '../components/HomePageSlider';

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;

  ${desktopMediaQuery} {
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 10vh;
  }
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

function HomePage() {
  return (
    <>
      <HomePageSlider />
      <div id="products">
        <Subtittle>Categorias</Subtittle>
        <Categories>
          {/* <CategoryCard text="Test Category" category="testcategory" img={testImage} align="left" /> */}
          <CategoryCard text="Anillos" category="anillos" img={anillosImage} align="left" />
          <CategoryCard text="Aros" category="aros" img={arosImage} align="right" />
          <CategoryCard text="Pulseras" category="pulseras" img={pulserasImage} align="left" />
          <CategoryCard text="Collares" category="collares" img={collaresImage} align="right" />
          <CategoryCard text="Relojes" category="relojes" img={relojesImage} align="right" />
        </Categories>
      </div>
    </>
  );
}

export default HomePage;
