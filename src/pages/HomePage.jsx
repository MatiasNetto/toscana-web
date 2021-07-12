import React from 'react';

//assets
import sliderImage1 from '../assets/slider/mobile/slider_1.jpg';

//components
import NavBar from '../components/NavBar';
import HomeSlider from '../components/HomeSlider';
import CategoryCard from '../components/CategoryCard';

//STYLES
import { Subtittle } from '../components/Styles';
import styled from 'styled-components';

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//COMPONENT

function HomePage() {
  return (
    <>
      <HomeSlider />
      <div className="products-container">
        <Subtittle>Categorias</Subtittle>
        <Categories>
          <CategoryCard text="Test Category" category="testcategory" img={sliderImage1} align="left" />
          <CategoryCard text="Anillos" category="anillos" img={sliderImage1} align="left" />
          <CategoryCard text="Aros" category="aros" img={sliderImage1} align="right" />
          <CategoryCard text="Pulseras" category="pulseras" img={sliderImage1} align="left" />
          <CategoryCard text="Collares" category="collares" img={sliderImage1} align="right" />
        </Categories>
      </div>
    </>
  );
}

export default HomePage;
