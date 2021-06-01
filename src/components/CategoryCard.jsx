import React from 'react';
import {Link} from 'react-router-dom'

//styles
import './styles/CategoryCard.css'

const CategoryCard = ({img,category,align}) => {

    return ( 
        <>
            <Link to='/category' className='category-card-container'>
                <h5 className='text' style={align == 'left' ? {textAlign:'left'} : {textAlign:'right'}} >{category}</h5>
                <img className='img' src={img} alt={category} />
            </Link> 
        </>
     );
}
 
export default CategoryCard;