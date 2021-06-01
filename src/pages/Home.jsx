import React, {useEffect, useState} from 'react';

//styles
import './styles/Home.css'


//components
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Subtittle from '../components/Subtittle'
import CategoryCard from '../components/CategoryCard'
import HomeSLider from '../components/HomeSlider';

let sliderNumber = 0
function Home() {
    
    return ( 
        <>
            <NavBar/>
            <HomeSLider/>
           
            {/* <div className='products-container'>
                <Subtittle text='Ver productos'/>
                <div className='categories-grid-container'>
                    <CategoryCard category='Anillos' img={sliderImage1} position='right'/>
                </div>
            </div> */}

        
        </>
     );
}
 
export default Home;