import React from 'react';
import "./styles/ProductCard.css"


const ProductCard = (props) => {
    // const show = async () => {
    //     const data = await db.collection('Anillos').doc().get()
    //     await console.log(data);
    // }
    // show()
    return ( 
        <>
        <div className="card">
            <img src={props.img} alt="" />
            <div className="card__product">{props.model}</div>
            <div className="card__price">{props.price}</div>
        </div>
        </>
     );
}
 
export default ProductCard;