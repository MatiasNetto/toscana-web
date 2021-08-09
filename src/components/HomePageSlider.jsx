import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { storage } from './Firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade, Zoom } from 'swiper';
import 'swiper/swiper-bundle.css';

//css
import { desktopMediaQuery } from './Styles';

//assets
import logoIMG from '../assets/logos/Logo-V2.png';
import mobileDefaultImg from '../assets/slider/mobile-default.jpg';
import desktopDefaultImg from '../assets/slider/desktop-default.jpg';

let defaultSliderImg;

if (window.innerWidth <= 996) {
  defaultSliderImg = mobileDefaultImg;
} else {
  defaultSliderImg = desktopDefaultImg;
}

//inicializar el Slider
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
    background-image: url(${defaultSliderImg});
    background-size: cover;
    background-position: center;
    filter: brightness(60%);
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
  //el estado se inicializa con la imagen default
  const [sliderImages, setSliderImages] = useState([defaultSliderImg]);

  useEffect(() => {
    //TODO en caso de ser mas grande que 996 que se establezca la direccion como admin/home-slider/desktop/
    let pathRef = storage.ref('admin/home-slider/mobile/'); //se crea la referencia a las imagenes de mobile
    if (window.innerWidth > 996) pathRef = storage.ref('admin/home-slider/desktop/'); //se crea la referencia a las imagenes de desktop
    let sliderFragment = [];
    const getURLs = async () => {
      let imagesList = (await pathRef.listAll()).items; //trae un array con todos los elementos del storage

      //mapea en imagesList el path de cada item del array
      imagesList = imagesList.map((item) => {
        return item.fullPath;
      });

      //recorre todos los paths, los convierte en url y la agrega a sliderFragment
      for (let imagePath of imagesList) {
        let imageURL = await storage.ref(imagePath).getDownloadURL();
        sliderFragment = [...sliderFragment, imageURL]; //agrega la url al fragmento
      }

      setSliderImages(sliderFragment); //una vez guardadas todas la imagenes en el fragment la almacena en el estado
      sessionStorage.setItem('homePageSliderImages', JSON.stringify(sliderFragment));
    };

    //si no existe data en el session storage ejecuta getURLs y pide las imagenes,en caso de estar guardadas, set el state con la info del session storage
    if (sessionStorage.getItem('homePageSliderImages') === null) {
      getURLs();
    } else {
      setSliderImages(JSON.parse(sessionStorage.getItem('homePageSliderImages')));
    }
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
              <SwiperImage style={{ height: '100%' }} src={image}></SwiperImage>
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
