import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Zoom } from 'swiper';

import 'swiper/swiper-bundle.css';

//!Falta condicion de que en caso de estar desde movile mostrar los controles del slider
SwiperCore.use([Zoom]);

const SwiperImage = styled.img`
  width: 100%;
`;

const PaginationContainer = styled.div`
  height: 2.5vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.8vh;
`;

const PointInactive = styled.div`
  height: 1.5vh;
  width: 1.5vh;
  margin: 0 0.5vh;
  border-radius: 100%;
  background: #bbf;
`;

const PointActive = styled(PointInactive)`
  background: #111;
`;

const ProductSlider = ({ imgsURL }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState(0);

  let sliderImages = [''];
  for (let i = 0; i < imgsURL.length; i++) {
    sliderImages[i] = (
      <SwiperSlide style={{ display: 'flex', alignItems: 'center' }} key={i}>
        <SwiperImage src={imgsURL[i]}></SwiperImage>
      </SwiperSlide>
    );
  }

  useEffect(() => {
    let paginationFragment = [];
    for (let i = 0; i < imgsURL.length; i++) {
      if (i == sliderIndex) paginationFragment[i] = <PointActive key={'point' + i} />;
      else paginationFragment[i] = <PointInactive key={'point' + i} />;
    }
    setPaginationInfo(paginationFragment);
  }, [sliderIndex, imgsURL]);

  return (
    <>
      <Swiper
        id="main"
        style={{ height: '80vh', width: '100vw', overflow: 'hidden' }}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        zoom={true}
        onSlideChange={(e) => {
          setSliderIndex(e.activeIndex);
        }}
      >
        {sliderImages}
      </Swiper>
      <PaginationContainer>{paginationInfo}</PaginationContainer>
    </>
  );
};

export default ProductSlider;
