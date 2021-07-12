import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { desktopMediaQuery } from './Styles';

//assets
import logo from '../assets/logos/logo.png';

//components
import Button from '../components/Button';

// import slider images for mobile or desktop
let sliderImagesLocation = '';

if (window.innerWidth <= 1000) {
  sliderImagesLocation = require.context('../assets/slider/mobile', true);
} else {
  sliderImagesLocation = require.context('../assets/slider/desktop', true);
}

//import the resources source
let sliderImages = [];
for (let i = 0; i < 8; i++) {
  sliderImages[i] = sliderImagesLocation(`./slider_${i + 1}.jpg`).default;
}
sliderImages[-1] = sliderImages[sliderImages.length - 1];

/*
################################################################################
#### Hay que remplazar la importacion por un use effect que llame a la BBDD ####
################################################################################
*/

/*################*/
/*#### STYLES ####*/
/*################*/

const Slider = styled.div`
  height: 92vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 8vh;
  overflow: hidden;
`;

const showAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100%;
  }
`;

const SliderImageShown = css`
  z-index: -999;
  animation: ${showAnimation} 1s;
`;

const SliderImageHidden = css`
  z-index: -9999;
`;

const SliderImage = styled.img`
  width: 100%;
  position: absolute;
  top: 50;
  bottom: 50;
  left: 0;
  filter: brightness(80%) blur(1px);
  opacity: 100%;

  ${(props) => (props.isHidden === true ? SliderImageHidden : SliderImageShown)}
`;

const Logo = styled.img`
  width: 40vw;
  ${desktopMediaQuery} {
    width: 12vw;
  }
`;

const Tittles = styled.div`
  margin-bottom: 10vh;
`;

const Tittle = styled.h2`
  font-size: 4em;
  letter-spacing: 4px;
  text-align: center;
`;

const Subtittle = styled.h3`
  font-size: 2em;
  font-weight: 300;
  text-align: center;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const HomeSlider = () => {
  const [sliderNumber, setSliderNumber] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  //Component will unmount
  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  //change slider image
  useEffect(() => {
    if (sliderNumber === sliderImages.length && isMounted === true) {
      setSliderNumber(0);
    } else if (isMounted === true) {
      setTimeout(() => {
        setSliderNumber(sliderNumber + 1);
      }, 3000);
    }
  }, [sliderNumber]);

  return (
    <Slider>
      <SliderImage
        src={sliderNumber % 2 !== 0 ? sliderImages[sliderNumber] : sliderImages[sliderNumber - 1]}
        isHidden={sliderNumber % 2 !== 0 ? false : true}
        alt=""
      />
      <SliderImage
        src={sliderNumber % 2 === 0 ? sliderImages[sliderNumber] : sliderImages[sliderNumber - 1]}
        isHidden={sliderNumber % 2 === 0 ? false : true}
        alt=""
      />
      <Logo src={logo} alt="Toscana logo" />
      <Tittles className="tittles-container">
        <Tittle className="tittle">Toscana</Tittle>
        <Subtittle className="subtittle">Accesorios</Subtittle>
      </Tittles>
      <Button text="Ver mas" />
    </Slider>
  );
};

export default HomeSlider;
