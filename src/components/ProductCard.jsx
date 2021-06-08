import React from 'react';
import {Link} from 'react-router-dom'
import "./styles/ProductCard.css"


const ProductCard = (props) => {
    const toLinkUrl = window.location.pathname + '/' + props.id //la url a la que es direccionado al hacer click en el producto
    return ( 
        <>
        <Link to={toLinkUrl} className="card">
            <img src={props.img} alt="" />
            <div className="card__product">{props.model}</div>
            <div className="card__price">{props.price}</div>
        </Link>
        </>
     );
}
 
export default ProductCard;