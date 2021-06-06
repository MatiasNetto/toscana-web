import React from 'react';

//styles
import './styles/Home.css';

//assets
import sliderImage1 from '../assets/slider/mobile/slider_1.jpg'

//components
import NavBar from '../components/NavBar';
import HomeSlider from '../components/HomeSlider';
import Subtittle from '../components/Subtittle'
import CategoryCard from '../components/CategoryCard'

function HomePage() {
  return (
    <>
      <NavBar />
      <HomeSlider />
      <div className="products-container">
        <Subtittle text="Categorias" />
        <div className="categories-grid-container">
          <CategoryCard text='Test Category' category="testcategory" img={sliderImage1} align="left" />
          <CategoryCard text='Anillos' category="anillos" img={sliderImage1} align="left" />
          <CategoryCard text='Aros' category="aros" img={sliderImage1} align="right" />
          <CategoryCard text='Pulseras' category="pulseras" img={sliderImage1} align="left" />
          <CategoryCard text='Collares' category="collares" img={sliderImage1} align="right" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
