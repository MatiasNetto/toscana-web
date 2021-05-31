import React from 'react';

//styles
import './styles/Home.css'

//components
import NavBar from '../components/NavBar'
import Button from '../components/Button'

const Home = () => {
    return ( 
        <>
            <NavBar/>
            <div className='main-container'>
                <div className='slider'>
                    <img className='slider-item' src="" alt="" />
                </div>
                <img className='logo-img' src="" alt="Toscana logo" />
                <div>
                    <h2 className='tittle'>Toscana</h2>
                    <h3 className='subtittle'>Accesorios</h3>
                </div>
                <Button text='Ver mas'/>
            </div>
        
        </>
     );
}
 
export default Home;