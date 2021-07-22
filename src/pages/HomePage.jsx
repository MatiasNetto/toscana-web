import React from 'react';
import styled from 'styled-components';

//assets
import arosImage from '../assets/categorys/Aros.png';
import anillosImage from '../assets/categorys/Anillo.png';
import collaresImage from '../assets/categorys/Collar.png';
import pulserasImage from '../assets/categorys/Pulsera.png';
import testImage from '../assets/categorys/Test.png';

//components
import CategoryCard from '../components/CategoryCard';

/*################*/
/*#### STYLES ####*/
/*################*/
import { Subtittle } from '../components/Styles';
import HomePageSlider from '../components/HomePageSlider';

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

function HomePage() {
  return (
    <>
      <HomePageSlider />
      <div className="products-container">
        <Subtittle>Categorias</Subtittle>
        <Categories>
          <CategoryCard text="Test Category" category="testcategory" img={testImage} align="left" />
          <CategoryCard text="Anillos" category="anillos" img={anillosImage} align="left" />
          <CategoryCard text="Aros" category="aros" img={arosImage} align="right" />
          <CategoryCard text="Pulseras" category="pulseras" img={pulserasImage} align="left" />
          <CategoryCard text="Collares" category="collares" img={collaresImage} align="right" />
        </Categories>
      </div>
    </>
  );
}

export default HomePage;
