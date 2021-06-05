import React, {useState, useEffect} from 'react';

//styles
import './styles/HomeSlider.css'

//assets
import logo from '../assets/logos/logo.png'

//components
import Button from '../components/Button'


// import slider images for mobile or desktop
let sliderImagesLocation = ''

if (window.innerWidth <= 1000) {
    sliderImagesLocation = require.context('../assets/slider/mobile', true)
} else {
    sliderImagesLocation = require.context('../assets/slider/desktop', true)
}

//import the resources source
let sliderImages = []
for (let i = 0; i < 8; i++){
    sliderImages[i] = sliderImagesLocation(`./slider_${i + 1}.jpg`).default
}
sliderImages[-1] = sliderImages[sliderImages.length -1]


//component
const HomeSlider = () => {
    const [sliderNumber, setSliderNumber] = useState(0)
    
    //change slider image
    useEffect(()=> {
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
 
export default HomeSlider;






