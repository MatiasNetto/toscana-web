import React, {useRef, useState} from 'react';

//styles
import './styles/Home.css'

//assets
import logo from '../assets/logos/logo.png'
import sliderImage1 from '../assets/slider/slider_1.jpg'
import sliderImage2 from '../assets/slider/slider_2.jpg'
import sliderImage3 from '../assets/slider/slider_3.jpg'
import sliderImage4 from '../assets/slider/slider_4.jpg'
import sliderImage5 from '../assets/slider/slider_5.jpg'
import sliderImage6 from '../assets/slider/slider_6.jpg'

//components
import NavBar from '../components/NavBar'
import Button from '../components/Button'

function Home() {
    const slider1 = useRef(null);
    const slider2 = useRef(null)
    let sliderImages = [sliderImage1,sliderImage2,sliderImage3,sliderImage4,sliderImage5,sliderImage6]
    sliderImages[-1] = sliderImages[sliderImages.length -1]
    let sliderNumber = 1
    
    
    const changeImage = () => {
        console.log('ashe');

        //change visibility
        if (sliderNumber %2 == 0) {
            slider1.current.className = 'slider-shown'
            slider2.current.className = 'slider-hidden'
            slider1.current.src = sliderImages[sliderNumber]
            slider2.current.src = sliderImages[sliderNumber - 1]
        } else {
            slider1.current.className = 'slider-hidden'
            slider2.current.className = 'slider-shown'
            slider1.current.src = sliderImages[sliderNumber - 1]
            slider2.current.src = sliderImages[sliderNumber]
        }

        sliderNumber ++

        //reset counter
        if (sliderNumber == (sliderImages.length)) {sliderNumber = 0}
    }
    setInterval(changeImage,4000)

    return ( 
        <>
            <NavBar/>
            <div className='main-container'>
                <img ref={slider1} src={sliderImage1} className='slider-shown' alt="" />
                <img ref={slider2} src={sliderImage1} className='slider-hidden' alt="" />
                <img className='logo-img' src={logo} alt="Toscana logo" />
                <div className='tittles-container'>
                    <h2 className='tittle'>Toscana</h2>
                    <h3 className='subtittle'>Accesorios</h3>
                </div>
                <Button text='Ver mas'/>
            </div>
        
        </>
     );
}
 
export default Home;