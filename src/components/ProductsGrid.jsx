import React from 'react';

//styles
import './styles/ProductsGrid.css';

//assets

//components
import ProductCard from './ProductCard'

const ProductsGirid = ({ products }) => {
  return (
    <>
      {products == null ? (
        <p>Cargando...</p>
      ) : (
        <div className='grid-container'>

        {products.map((e) => {
          return (
            <ProductCard
            key={e.model}
            img={e.imgs[1]}
            model={e.model}
            price={e.price}
            />
            );
          })}

        </div>
      )}
    </>
  );
};

export default ProductsGirid;
