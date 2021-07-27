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

const ProductsGirid = ({ products, customClick, onClickCallback }) => {
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
              customClick={customClick}
              onClickCallback={
                customClick === true
                  ? () => {
                      onClickCallback(product);
                    }
                  : null
              }
            />
          );
        })}
      </Grid>
    </>
  );
};

export default ProductsGirid;
