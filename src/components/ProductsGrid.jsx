import React from 'react';
import styled from 'styled-components';
import { desktopMediaQuery } from './Styles';

//components
import ProductCard from './ProductCard';

/*###############*/
/*### STYLES ####*/
/*###############*/

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 0 1vw;
  margin-top: 2vh;

  ${desktopMediaQuery} {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5vh;
  }
`;

/*##################*/
/*### COMPONENT ####*/
/*##################*/

const ProductsGirid = ({ products }) => {
  //necesitas agregar a img= el dato de la referencia. tenes que tomar el dato de product.imgsURI y convertirlo en una referencia. con esa referencia
  //en realidad no se muy bien. lee bien la documentacion
  //https://firebase.google.com/docs/storage/web/download-files?authuser=0

  return (
    <>
      <Grid>
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              category={product.category}
              id={product.id}
              model={product.model}
              price={product.price}
              imgsURL={product.imgsURL}
              new={product.new}
              trending={product.trending}
              hidden={product.hidden}
              outOfStock={product.outOfStock}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default ProductsGirid;
