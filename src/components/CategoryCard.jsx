import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  box-shadow: 0px 2px 3px #000a;
  text-decoration: none;
`;

const Name = styled.h2`
  font-size: 2.5em;
  color: #fff;
  margin: 20px 20px;
  text-align: ${(props) => props.align};
`;

const Img = styled.img`
  width: 100%;
  position: absolute;
  z-index: -99;
  top: -60%;
  left: 0;
  filter: brightness(80%);
`;

/*###################*/
/*#### COMPONENT ####*/
/*###################*/

const CategoryCard = ({ img, category, align, text }) => {
  return (
    <>
      <CategoryLink to={'/category/' + category}>
        <Name className="text" align={align}>
          {text}
        </Name>
        <Img src={img} alt={category} />
      </CategoryLink>
    </>
  );
};

export default CategoryCard;
