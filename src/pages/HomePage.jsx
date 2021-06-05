import React, {useEffect, useState} from 'react';

//styles
import './styles/Home.css'

//assets
import anillo from '../assets/slider/mobile/slider_1.jpg'


//components
import NavBar from '../components/NavBar'
import Button from '../components/Button'
import Subtittle from '../components/Subtittle'
import CategoryGrid from '../components/CategoryGrid'
import HomeSlider from '../components/HomeSlider';

let sliderNumber = 0
function HomePage() {
    
    return ( 
        <>
            <NavBar/>
            <HomeSlider/>
            <CategoryGrid/>
        </>
     );
}
 
export default HomePage;