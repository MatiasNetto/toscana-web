import React from 'react';

//styles
import './styles/Home.css'


//components
import NavBar from '../components/NavBar'
import CategoryGrid from '../components/CategoryGrid'
import HomeSlider from '../components/HomeSlider';

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