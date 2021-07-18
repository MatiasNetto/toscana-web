import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import ProductsGirid from '../ProductsGrid';

const ProductsPreview = (props) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let _isMounted = true;
    setProducts(null); // reset el state para que aparezca el texto como cargando

    const getProductList = async (category) => {
      //trae los productos desde la categoria indicada por parametros y los almacena en productsFragment
      let productsFragment = [];
      const productsRequest = await db.collection(category).get();

      productsRequest.forEach((product) => {
        //Recorre la data traida y agrega los productos a productsFragment
        productsFragment = [...productsFragment, product.data()];
      });

      //setea el state products como productsFragment para no andar actualizando todo el tiempo el state, previene memory leack
      if (_isMounted) setProducts(productsFragment);
    };

    getProductList(props.category); //Llama la funcion asincrona

    //Cuando el componente se desmonte, cancela toda actualizacion de estado
    return () => {
      _isMounted = false;
    };
  }, [props.category]);

  return (
    <>
      {products !== null && (
        <ProductsGirid products={products} customClick={props.customClick} onClickCallback={props.onClickCallback} />
      )}
    </>
  );
};

export default ProductsPreview;
