import React, {useState, useEffect} from 'react';

//styles
import './styles/HomeSlider.css'

//assets
import logo from '../assets/logos/logo.png'
import sliderImage1 from '../assets/slider/slider_1.jpg'
import sliderImage2 from '../assets/slider/slider_2.jpg'
import sliderImage3 from '../assets/slider/slider_3.jpg'
import sliderImage4 from '../assets/slider/slider_4.jpg'
import sliderImage5 from '../assets/slider/slider_5.jpg'
import sliderImage6 from '../assets/slider/slider_6.jpg'

//components
import Button from '../components/Button'


const HomeSLider = () => {

    const [sliderNumber, setSliderNumber] = useState(0)
        let sliderImages = [sliderImage1,sliderImage2,sliderImage3,sliderImage4,sliderImage5,sliderImage6]
        sliderImages[-1] = sliderImages[sliderImages.length -1]
    
    useEffect(()=> {
        console.log(sliderNumber);
        if (sliderNumber == sliderImages.length) {setSliderNumber(0)}
        else {setTimeout(()=>{setSliderNumber(sliderNumber + 1)},3000)}
    })



    return (
        <div className='main-container'>
            <img src={sliderNumber %2 !== 0 ? sliderImages[sliderNumber] : sliderImages[sliderNumber - 1]} className={sliderNumber %2 !== 0 ? 'slider-shown' : 'slider-hidden'} alt="" />
            <img src={sliderNumber %2 === 0 ? sliderImages[sliderNumber] : sliderImages[sliderNumber - 1]} className={sliderNumber %2 === 0 ? 'slider-shown' : 'slider-hidden'} alt="" />
            <img className='logo-img' src={logo} alt="Toscana logo" />
            <div className='tittles-container'>
                <h2 className='tittle'>Toscana</h2>
                <h3 className='subtittle'>Accesorios</h3>
            </div>
            <Button text='Ver mas'/>
        </div> );
}
 
export default HomeSLider;






