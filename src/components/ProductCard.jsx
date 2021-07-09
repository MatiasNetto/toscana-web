import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';

const CardLink = styled(Link)`
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
  background-color: whitesmoke;
  text-decoration: none;
`

const Image = styled.img`
  height: 70%;
  width: 100%;
`

const ProductInfo = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8% 0;
`

const Model = styled.h3`

`

const Price = styled.p`

`



const ProductCard = (props) => {
    const toLinkUrl = window.location.pathname + '/' + props.id //la url a la que es direccionado al hacer click en el producto
    return ( 
        <>
        <CardLink to={toLinkUrl} className="card">
            <Image src={props.img} alt="" />
            <ProductInfo>
                <Model className="card__product">{props.model}</Model>
                <Price className="card__price">${props.price}</Price>
            </ProductInfo>
        </CardLink>
        </>
     );
}
 
export default ProductCard;