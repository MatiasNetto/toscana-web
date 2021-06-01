import React from 'react';

const CategoryCard = (props) => {

    return ( 
        <>
            <div className='category-card-container'>
                <img src={props.img} alt={props.category} />
                <h5 style={{textAlign: + props.position}} >{props.category}</h5>
            </div> 
        </>
     );
}
 
export default CategoryCard;