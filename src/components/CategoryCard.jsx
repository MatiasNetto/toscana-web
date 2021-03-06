import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAnalytics } from './adminPage/AnalitycsContext';
import { desktopMediaQuery } from './Styles';

/*################*/
/*#### STYLES ####*/
/*################*/

const CategoryLink = styled(Link)`
  height: 25vh;
  width: 90%;
  position: relative;
  overflow: hidden;
  margin-top: 3vh;
  border-radius: 10px;
  /* box-shadow: 0px 2px 3px #000a; */
  box-shadow: 2px 4px 4px #0006;
  text-decoration: none;

  ${desktopMediaQuery} {
    width: 22vw;
    height: 13vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Name = styled.h2`
  font-size: 2.5em;
  color: #fff;
  margin: 20px 20px;
  font-weight: 200;
  letter-spacing: 2px;
  text-align: ${(props) => props.align};

  ${desktopMediaQuery} {
    text-align: center;
  }
`;

const Img = styled.img`
  width: 100%;
  position: absolute;
  z-index: -99;
  top: -60%;
  left: 0;
  filter: brightness(70%);

  ${desktopMediaQuery} {
    transform: scale(130%);
  }
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const CategoryCard = ({ img, category, align, text }) => {
  const { addCategory } = useAnalytics();
  return (
    <>
      <CategoryLink
        onClick={() => {
          addCategory(category);
          setTimeout(() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'auto',
            });
          }, 0);
        }}
        onScrollCapture={() => {
          console.log('ashei');
        }}
        to={'/category/' + category}
      >
        <Name className="text" align={align}>
          {text}
        </Name>
        <Img src={img} alt={category} />
      </CategoryLink>
    </>
  );
};

export default CategoryCard;
