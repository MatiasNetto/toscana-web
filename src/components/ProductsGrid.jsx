import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {storage} from '../components/Firebase'

//components
import ProductCard from './ProductCard'

/*###############*/
/*### STYLES ####*/
/*###############*/

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 40vh;
  align-items: center;
  justify-items: center;
`

/*##################*/
/*### COMPONENT ####*/
/*##################*/

const ProductsGirid = ({ products }) => {
  //necesitas agregar a img= el dato de la referencia. tenes que tomar el dato de product.imgsURI y convertirlo en una referencia. con esa referencia 
  //en realidad no se muy bien. lee bien la documentacion
  //https://firebase.google.com/docs/storage/web/download-files?authuser=0
  return (
    <>
      {products == null ? (
        <p>Cargando...</p>
      ) : (
      <Grid>

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

      </Grid>
      )}
    </>
  );
};

export default ProductsGirid;
