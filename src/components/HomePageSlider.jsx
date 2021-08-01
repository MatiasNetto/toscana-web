import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { storage } from './Firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade, Zoom } from 'swiper';
import 'swiper/swiper-bundle.css';

//assets
import logoIMG from '../assets/logos/Logo-V2.png';
import sliderIMG from '../assets/slider/mobile/slider_1.jpg';

//css
import { desktopMediaQuery } from './Styles';

//!Falta condicion de que en caso de estar desde movile mostrar los controles del slider
SwiperCore.use([Zoom, Autoplay, EffectFade]);

/*################*/
/*#### STYLES ####*/
/*################*/

const SwiperImage = styled.img`
  width: 100%;
  filter: brightness(60%);
`;

const Slider = styled.div`
  height: 92vh;
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-top: 8vh;

  &:before {
    content: '';
    height: 92vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-image: url(${sliderIMG});
    background-size: cover;
    background-position: center;
    filter: brightness(80%);
  }
`;

// const SwiperSlideStyles = styled.css``;

const Content = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 3vh 0 10vh 0;
  align-items: center;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 50vw;
  ${desktopMediaQuery} {
    width: 16vw;
  }
`;

const Tittle = styled.h2`
  font-size: 4em;
  letter-spacing: 4px;
  text-align: center;
  color: #fff;
  font-weight: 200;

  ${desktopMediaQuery} {
    font-size: 7em;
  }
`;

const Subtittle = styled.h3`
  font-size: 2em;
  font-weight: 300;
  text-align: center;
  color: #fff;

  ${desktopMediaQuery} {
    font-size: 3em;
  }
`;

const SlideButton = styled.button`
  width: 60vw;
  height: 18vw;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 100px;
  font-size: 1.5em;
  color: #fff;
  transition: all 0.5s;

  &:hover {
    background: #fff;
    border: 2px solid #0000;
    color: #000;
  }

  ${desktopMediaQuery} {
    height: 5vw;
    width: 20vw;
    font-size: 2em;
    cursor: pointer;
  }
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const HomePageSlider = () => {
  //el estado se inicializa con la url de la primera imagen, hay que agregarla a mano, despues el resto son traidas con http requests
  const [sliderImages, setSliderImages] = useState([
    'https://firebasestorage.googleapis.com/v0/b/tostest-2fbf8.appspot.com/o/admin%2Fhome-slider%2Fmobile%2Fslider_1.jpg?alt=media&token=c1f3d51f-13b1-44e6-b5b4-0bb9abd7cee2',
  ]);

  useEffect(() => {
    let pathRef = storage.ref('admin/home-slider/mobile/'); //se crea la referencia hacia la base de datos
    let sliderFragment = [];
    let imagesCount = 8; //se establece la cantidad de imagenes que apareceran en el slider
    const getURLs = async () => {
      for (let i = 1; i <= imagesCount; i++) {
        let imageURL = await pathRef.child('slider_' + i + '.jpg').getDownloadURL(); //trae la imagen desde el servidor y la almacena en la variable

        sliderFragment[i] = imageURL; //agrega la url al fragmento
        console.log(imageURL);
      }
      setSliderImages(sliderFragment); //una vez guardadas todas la imagenes en el fragment la almacena en el estado
    };
    getURLs();
  }, []);

  //scroll hacia abajo
  const handleButtonClick = (e) => {
    window.scroll({
      top: e.target.parentNode.clientHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  //DOM object

  return (
    <Slider>
      <Swiper
        effect="fade"
        id="main"
        style={{ height: '100%', width: '100vw', overflow: 'hidden' }}
        spaceBetween={0}
        slidesPerView={1}
        speed={1000}
        autoplay={{
          delay: 8000,
        }}
        centeredSlides
        noSwiping={true}
        zoom={true}
      >
        {sliderImages.map((image) => {
          return (
            <SwiperSlide
              className="swiper-no-swiping"
              style={{ display: 'flex', alignItems: 'center' }}
              key={Math.random()}
            >
              <SwiperImage src={image}></SwiperImage>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Content>
        <Logo src={logoIMG} alt="Toscana logo" />
        <div>
          <Tittle>Toscana</Tittle>
          <Subtittle>Accesorios</Subtittle>
        </div>
        <SlideButton onClick={(e) => handleButtonClick(e)}>Ver productos</SlideButton>
      </Content>
    </Slider>
  );
};

export default HomePageSlider;
