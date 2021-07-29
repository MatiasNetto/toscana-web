import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Zoom, Navigation } from 'swiper';

import 'swiper/swiper-bundle.css';
import { desktopMediaQuery } from './Styles';

//!Falta condicion de que en caso de estar desde movile mostrar los controles del slider
if (window.innerWidth < 996) {
  SwiperCore.use([Zoom]);
} else {
  SwiperCore.use([Navigation]);
}

/*################*/
/*#### STYLES ####*/
/*################*/

const Container = styled.div`
  height: 82vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${desktopMediaQuery} {
    padding: 10px;
    height: 92vh;
    width: 30%;
  }
`;

const SwiperComponent = styled(Swiper)`
  height: 100%;
  width: 100%;
  overflow: hidden;

  ${desktopMediaQuery} {
    height: 90vh;
  }
`;

const SwiperSlideComponent = styled(SwiperSlide)`
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #f00;
`;

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

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const ProductSlider = ({ imgsURL }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState(0);

  let sliderImages = [''];
  for (let i = 0; i < imgsURL.length; i++) {
    sliderImages[i] = (
      <SwiperSlide style={{ display: 'flex', alignItems: 'center', height: '100%' }} key={i}>
        <SwiperImage src={imgsURL[i]}></SwiperImage>
      </SwiperSlide>
    );
  }

  useEffect(() => {
    let paginationFragment = [];
    for (let i = 0; i < imgsURL.length; i++) {
      if (i === sliderIndex) paginationFragment[i] = <PointActive key={'point' + i} />;
      else paginationFragment[i] = <PointInactive key={'point' + i} />;
    }
    setPaginationInfo(paginationFragment);
  }, [sliderIndex, imgsURL]);

  return (
    <>
      <Container>
        <SwiperComponent
          id="main"
          spaceBetween={0}
          slidesPerView={1}
          navigation={window.innerWidth <= 996 ? false : true} //si es mobile no pone navegation, si es desktop si
          zoom={true}
          onSlideChange={(e) => {
            setSliderIndex(e.activeIndex);
          }}
        >
          {sliderImages}
        </SwiperComponent>
        <PaginationContainer>{paginationInfo}</PaginationContainer>
      </Container>
    </>
  );
};

export default ProductSlider;
