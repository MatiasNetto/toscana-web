import React from 'react';

//styles
import './styles/CategoryGrid.css'

//assets
import sliderImage1 from '../assets/slider/mobile/slider_1.jpg'

//components
import Subtittle from '../components/Subtittle'
import CategoryCard from '../components/CategoryCard'

const CategoryGirid = () => {
    return ( 
        <>
            <div className='products-container'>
                <Subtittle text='Categorias'/>
                <div className='categories-grid-container'>
                    <CategoryCard category='Anillos' img={sliderImage1} align='left'/>
                    <CategoryCard category='Aros' img={sliderImage1} align='right'/>
                    <CategoryCard category='Pulseras' img={sliderImage1} align='left'/>
                    <CategoryCard category='Collares' img={sliderImage1} align='right'/>
                </div>
            </div>
        </>
     );
}
 
export default CategoryGirid;