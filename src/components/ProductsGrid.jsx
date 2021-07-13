import React from 'react';
import styled from 'styled-components';

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
`;

/*##################*/
/*### COMPONENT ####*/
/*##################*/

const ProductsGirid = ({ products, onClickCallback }) => {
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
                imgsURL={product.imgsURL}
                model={product.model}
                price={product.price}
                id={product.id}
                onClickCallback={onClickCallback}
              />
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default ProductsGirid;
