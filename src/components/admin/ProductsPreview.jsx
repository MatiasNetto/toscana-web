import React, { useState, useEffect } from 'react';
import { useGetProductsCollection } from '../../hooks/useGetProductsCollection';
import { db } from '../Firebase';
import PageLoader from '../PageLoader';
import ProductsGirid from '../ProductsGrid';

const ProductsPreview = (props) => {
  const [products, setProducts] = useState(null);
  const [awaiting, setAwaiting] = useState(true); //establece con el valor default que establece la condicion anterior
  const [error, setError] = useState({ error: false });

  //peticion de los productos, se pasa la categoria y el estado inicial de cargando o no

  let { collection, isPending, err } = useGetProductsCollection(props.category, true, true);

  //cuando cambia el valor de isPending setea el estado con los valores traidos de la peticion solo en caso de que el estado se encuentre en awaiting true
  useEffect(() => {
    //solo en caso de que el estado sea de cargando actualiza los datos del estado
    if (awaiting === true) {
      setProducts(collection);
      setError(err);
      setAwaiting(isPending);
    }
  }, [isPending]);

  useEffect(() => {
    setAwaiting(true);
    setProducts(null);
  }, [props.reload, props.category]);

  return (
    <>
      {/* {products !== null && (
        <ProductsGirid products={products} customClick={props.customClick} onClickCallback={props.onClickCallback} />
      )} */}
      {awaiting === true ? (
        <PageLoader />
      ) : (
        <ProductsGirid products={products} customClick={props.customClick} onClickCallback={props.onClickCallback} />
      )}
    </>
  );
};

export default ProductsPreview;
