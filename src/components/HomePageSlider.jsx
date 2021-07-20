import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { storage } from './Firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade, Zoom } from 'swiper';

import 'swiper/swiper-bundle.css';

//!Falta condicion de que en caso de estar desde movile mostrar los controles del slider
SwiperCore.use([Zoom, Autoplay, EffectFade]);

/*################*/
/*#### STYLES ####*/
/*################*/

const SwiperImage = styled.img`
  width: 100%;
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const HomePageSlider = () => {
  const [sliderImages, setSliderImages] = useState(undefined);

  useEffect(() => {
    let pathRef = storage.ref('admin/home-slider/mobile/');
    let sliderFragment = [];
    let imagesCount = 8;
    const getURLs = async () => {
      for (let i = 1; i <= imagesCount; i++) {
        let imageURL = await pathRef.child('slider_' + i + '.jpg').getDownloadURL();

        sliderFragment[i] = (
          <SwiperSlide className="swiper-no-swiping" style={{ display: 'flex', alignItems: 'center' }} key={i}>
            <SwiperImage src={imageURL}></SwiperImage>
          </SwiperSlide>
        );

        // if (i == 1) setSliderImages(sliderFragment);
      }
      setSliderImages(sliderFragment);
    };
    getURLs();
  }, []);

  return (
    <>
      <Swiper
        effect="fade"
        id="main"
        style={{ height: '80vh', width: '100vw', overflow: 'hidden' }}
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
        <p>nazii</p>
        {sliderImages}
      </Swiper>
      {/* <PaginationContainer>{paginationInfo}</PaginationContainer> */}
    </>
  );
};

export default HomePageSlider;
