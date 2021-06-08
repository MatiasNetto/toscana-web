import React, { useEffect, useState } from 'react';
import {storage} from '../components/Firebase'

//styles
import './styles/ProductsGrid.css';

//assets

//components
import ProductCard from './ProductCard'

const ProductsGirid = ({ products }) => {
  //necesitas agregar a img= el dato de la referencia. tenes que tomar el dato de product.imgsURI y convertirlo en una referencia. con esa referencia 
  //en realidad no se muy bien. lee bien la documentacion
  //https://firebase.google.com/docs/storage/web/download-files?authuser=0
  return (
    <>
      {products == null ? (
        <p>Cargando...</p>
      ) : (
        <div className='grid-container'>

        {products.map((product) => {
          return (
            <ProductCard
            key={product.id}
            img={product.imgsURI}
            model={product.model}
            price={product.price}
            id={product.id}
            />
            );
          })}

        </div>
      )}
    </>
  );
};

export default ProductsGirid;
